import { useState } from 'react';
import { Plus, Minus, ShoppingBag, ArrowRight, X, Check, MapPin, CreditCard, Package, ChevronDown, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

type CheckoutStep = 'cart' | 'details' | 'payment' | 'success';
type PaymentMethod = 'transfer' | 'cod';

const nigerianStates: Record<string, string[]> = {
  'Abia': ['Umuahia', 'Aba', 'Ohafia', 'Arochukwu', 'Bende', 'Isiala-Ngwa North', 'Isiala-Ngwa South', 'Ugwunagbo', 'Osisioma Ngwa', 'Obingwa'],
  'Adamawa': ['Yola', 'Mubi', 'Jimeta', 'Numan', 'Ganye', 'Hong', 'Song', 'Mayo-Belwa', 'Jada', 'Gombi'],
  'Akwa Ibom': ['Uyo', 'Ikot Ekpene', 'Eket', 'Oron', 'Uyaro', 'Etinan', 'Ikot Abasi', 'Mkpat-Enin', 'Okobo', 'Onna'],
  'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Awka-Etiti', 'Nawgu', 'Orumba North', 'Orumba South', 'Anambra East', 'Anambra West', 'Ayamelum'],
  'Bauchi': ['Bauchi', 'Azare', 'Misau', 'Jamaare', 'Ningi', 'Darazo', 'Warji', 'Ganjuwa', 'Tafawa-Balewa', 'Dambam'],
  'Bayelsa': ['Yenagoa', 'Brass', 'Ogbia', 'Kolga', 'Nembe', 'Sagbama', 'Ekeremor', 'Opokuma', 'Southern Ijaw', 'Membe'],
  'Benue': ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Obi', 'Agatu', 'Apa', 'Buruku', 'Guma', 'Gwer-East'],
  'Borno': ['Maiduguri', 'Bama', 'Biu', 'Dikwa', 'Gwoza', 'Kukawa', 'Mobbar', 'Monguno', 'Ngala', 'Nganzai'],
  'Cross River': ['Calabar', 'Ikom', 'Ogoja', 'Obudu', 'Ugep', 'Obanliku', 'Boki', 'Bakassi', 'Akamkpa', 'Biase'],
  'Delta': ['Asaba', 'Warri', 'Effurun', 'Sapele', 'Ughelli', 'Burutu', 'Patani', 'Okpe', 'Uvwie', 'Oshimili-North'],
  'Ebonyi': ['Abakaliki', 'Afikpo', 'Izzi', 'Ohaukwu', 'Ebonyi', 'Ikwo', 'Ishielu', 'Ezza', 'Ezza-South', 'Cgment'],
  'Edo': ['Benin City', 'Edo', 'Esan', 'Etsako', 'Owan', 'Akoko-Edo', 'Orhionmwin', 'Uhunmwonde', 'Ovia North-East', 'Ovia South-West'],
  'Ekiti': ['Ado-Ekiti', 'Ikere-Ekiti', 'Ilesa', 'Oye', 'Efon', 'Ekiti-East', 'Ekiti-West', 'Emure', 'Ido-Osi', 'Ilejemeje'],
  'Enugu': ['Enugu', 'Nsukka', 'Awgu', 'Udi', 'Oji River', 'Ezeagu', 'Igbo-Eze-North', 'Igbo-Eze-South', 'Isi-Uzo', 'Aninri'],
  'FCT Abuja': ['Gwagwalada', 'Kuje', 'Abaji', 'Bwari', 'Kwali', 'Municipal Area Council', 'AMAC'],
  'Gombe': ['Gombe', 'Funakaye', 'Yamaltu-Deba', 'Balanga', 'Billiri', 'Kaltungo', 'Shongom', 'Dukku', 'Nafada', 'Kwami'],
  'Imo': ['Owerri', 'Orlu', 'Okigwe', 'Mbaitoli', 'Nwangele', 'Kemer', 'Isu', 'Njaba', 'Onuimo', 'Ihite-Uboma'],
  'Jigawa': ['Dutse', 'Hadejia', 'Gumel', 'Kazaure', 'Birnin-Kudu', 'Gwaram', 'Birniwa', 'Guri', 'Kiyawa', 'Ringim'],
  'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Kakuri', 'Sabon-Gari', 'Kagarko', 'Chikun', 'Giwa', 'Igabi', 'Jaba'],
  'Kano': ['Kano', 'Wudil', 'Rano', 'Bunkure', 'Kibiya', 'Tofa', 'Minjibir', 'Ungogo', 'Nassarawa', 'Dala'],
  'Katsina': ['Katsina', 'Daura', 'Funtua', 'Jibia', 'Dutsin-Ma', 'Mashi', 'Safana', 'Bin Yauri', 'Kankara', 'Malumfashi'],
  'Kebbi': ['Birnin-Kebbi', 'Argungu', 'Yauri', 'Zuru', 'Bunza', 'Dandi', 'Gwandu', 'Kalgo', 'Koko-Besse', 'Maiyama'],
  'Kogi': ['Lokoja', 'Okene', 'Idah', 'Kabba', 'Ankpa', 'Okenyi', 'Dekina', 'Bassa', 'Ibaji', 'Yagba-East'],
  'Kwara': ['Ilorin', 'Offa', 'Ikeji', 'Omu-Aran', 'Jebba', 'Kaiama', 'Patigi', 'Edu', 'Moro', 'Asa'],
  'Lagos': ['Lagos Island', 'Lagos Mainland', 'Victoria Island', 'Lekki', 'Ikeja', 'Surulere', 'Yaba', 'Apapa', 'Mushin', 'Kosofe', 'Shomolu', 'Eti-Osa', 'Epe', 'Ikorodu', 'Badagry', 'Oshodi-Isolo', 'Amuwo-Odofin', 'Alimosho', 'Ifako-Ijaye', 'Agege'],
  'Nasarawa': ['Lafia', 'Keffi', 'Akwanga', 'Karfi', 'Nasarawa', 'Toto', 'Gada', 'Doma', 'Keana', 'Obi'],
  'Niger': ['Minna', 'Bida', 'Kontagora', 'Mariga', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi', 'Mokwa'],
  'Ogun': ['Abeokuta', 'Ilisha-Remo', 'Sagamu', 'Ota', 'Ijebu-Ode', 'Odogbolu', 'Remo-North', 'Remo-South', 'Yewa-North', 'Yewa-South'],
  'Ondo': ['Akure', 'Ondo', 'Owo', 'Okitipupa', 'Ikare', 'Ore', 'Idanre', 'Sewa', 'Ose', 'Ifedayo'],
  'Osun': ['Ilesa', 'Osogbo', 'Ikirun', 'Ila-Orangun', 'Ede', 'Ife', 'Iwo', 'Ikire', 'Inisa', 'Oluku'],
  'Oyo': ['Ibadan', 'Iseyin', 'Oyo', 'Ogbomoso', 'Saki', 'Ibadan North', 'Ibadan South-West', 'Akinyele', 'Lagelu', 'Egbeda'],
  'Plateau': ['Jos', 'Barkin-Ladi', 'Pankshin', 'Shendam', 'Riyom', 'Bassa', 'Kanam', 'Wase', 'Mikang', 'Kuru'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Okrika', 'Eleme', 'Etche', 'Omuma', 'Oyigbo', 'Tai', 'Gokana', 'Khana'],
  'Sokoto': ['Sokoto', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Silame', 'Gawudu', 'Bodinga', 'Dange', 'Shagari', 'Kebbe'],
  'Taraba': ['Jalingo', 'Bali', 'Gashaka', 'Gassol', 'Ibi', 'Jemu', 'Karim-Lamido', 'Lau', 'Sardauna', 'Ussa'],
  'Yobe': ['Damaturu', 'Potiskum', 'Gujba', 'Gulani', 'Fika', 'Nangere', 'Tarmuwa', 'Yusufari', 'Bade', 'Nguru'],
  'Zamfara': ['Gusau', 'Kaura-Namoda', 'Sokoto', 'Maradun', 'Shinkafi', 'Bukkuyum', 'Anka', 'Talata-Mafara', 'Zurmi', 'Gummi']
};

const nigerianStatesList = Object.keys(nigerianStates);

export default function Cart() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });
  const [phoneError, setPhoneError] = useState('');

  const total = getTotalPrice();
  const shipping = 2500;
  const grandTotal = total + shipping;

  const availableCities = orderDetails.state ? nigerianStates[orderDetails.state] || [] : [];

  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 11);
    setOrderDetails({ ...orderDetails, phone: numericValue });
    
    if (numericValue.length > 0 && !numericValue.startsWith('0')) {
      setPhoneError('Phone must start with 0');
    } else if (numericValue.length > 0 && numericValue.length < 11) {
      setPhoneError('Phone number must be 11 digits');
    } else {
      setPhoneError('');
    }
  };

  const handleStateChange = (state: string) => {
    setOrderDetails({ ...orderDetails, state, city: '' });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCartOpen(false);
      setCheckoutStep('cart');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCheckoutStep('details');
  };

  const handleContinueToPayment = () => {
    if (!orderDetails.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderDetails.email)) {
      toast.error('Please enter a valid email');
      return;
    }
    if (orderDetails.phone.length !== 11) {
      toast.error('Please enter a valid 11-digit phone number');
      return;
    }
    if (!orderDetails.address.trim()) {
      toast.error('Please enter your delivery address');
      return;
    }
    if (!orderDetails.state) {
      toast.error('Please select your state');
      return;
    }
    if (!orderDetails.city) {
      toast.error('Please select your city');
      return;
    }
    setCheckoutStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const itemsList = items.map(item => 
      `- ${item.name} (${item.selectedSize}${item.selectedColor ? ', ' + item.selectedColor : ''}) x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const templateParams = {
      to_email: 'darkjesterxd2009@gmail.com',
      from_name: orderDetails.name,
      from_email: orderDetails.email,
      phone: orderDetails.phone,
      address: orderDetails.address,
      city: orderDetails.city,
      state: orderDetails.state,
      items: itemsList,
      subtotal: `₦${total.toLocaleString()}`,
      shipping: `₦${shipping.toLocaleString()}`,
      total: `₦${grandTotal.toLocaleString()}`,
      payment_method: paymentMethod === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery',
      order_date: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        'service_s878amk',
        'template_a4crwic',
        templateParams,
        '0RT6CTEgKh13HuZOX'
      );
      
      toast.success('Order placed! Check your email for confirmation.');
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const whatsappMsg = encodeURIComponent(`New Order from Kay-fits\n\nName: ${orderDetails.name}\nPhone: ${orderDetails.phone}\nAddress: ${orderDetails.address}\nCity: ${orderDetails.city}\nState: ${orderDetails.state}\n\nOrder Total: ₦${grandTotal.toLocaleString()}\nPayment: ${paymentMethod === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery'}`);
    const whatsappLink = `https://wa.me/2347025451230?text=${whatsappMsg}`;
    window.open(whatsappLink, '_blank');

    setCheckoutStep('success');
    
    setTimeout(() => {
      clearCart();
      setCartOpen(false);
      setCheckoutStep('cart');
      setOrderDetails({ name: '', email: '', phone: '', address: '', city: '', state: '' });
      setPaymentMethod('transfer');
      setIsSubmitting(false);
    }, 3000);
  };

  const handleBack = () => {
    if (checkoutStep === 'details') setCheckoutStep('cart');
    if (checkoutStep === 'payment') setCheckoutStep('details');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={() => handleOpenChange(false)} />
      
      <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-[#111] border-l border-white/10 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
            {checkoutStep !== 'cart' && (
              <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowRight className="w-5 h-5 text-white/70 rotate-180" />
              </button>
            )}
            <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#ff6b35]" />
            </div>
            <div>
              <h2 className="font-display text-lg text-white">
                {checkoutStep === 'cart' && 'Shopping Cart'}
                {checkoutStep === 'details' && 'Shipping Info'}
                {checkoutStep === 'payment' && 'Payment'}
                {checkoutStep === 'success' && 'Order Placed!'}
              </h2>
              {checkoutStep === 'cart' && items.length > 0 && (
                <p className="text-xs text-white/40">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              )}
            </div>
          </div>
          <button onClick={() => handleOpenChange(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
          <div className="flex items-center justify-center gap-6 px-6 py-4 bg-[#1a1a1a]/50">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                checkoutStep === 'details' ? 'bg-[#ff6b35] text-white' : 'bg-green-500 text-white'
              }`}>
                {checkoutStep === 'details' ? '1' : <Check className="w-4 h-4" />}
              </div>
              <span className={`text-sm ${checkoutStep === 'details' ? 'text-white' : 'text-white/40'}`}>Details</span>
            </div>
            <div className="w-12 h-px bg-white/20" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                checkoutStep === 'payment' ? 'bg-[#ff6b35] text-white' : 'bg-white/10 text-white/40'
              }`}>
                2
              </div>
              <span className={`text-sm ${checkoutStep === 'payment' ? 'text-white' : 'text-white/40'}`}>Payment</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-white/20" />
                  </div>
                  <h3 className="font-display text-lg text-white mb-2">Your cart is empty</h3>
                  <p className="text-white/40 mb-6 text-sm">Add items to start shopping</p>
                  <button onClick={() => handleOpenChange(false)} className="bg-[#ff6b35] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors">
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex gap-3 p-3 bg-white/5 rounded-2xl">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover loaded" loading="lazy" decoding="async" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-white/40 text-xs mt-0.5">{item.selectedSize}{item.selectedColor && ` · ${item.selectedColor}`}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-white/5 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                              <Minus className="w-3 h-3 text-white/60" />
                            </button>
                            <span className="text-white text-sm w-5 text-center font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                              <Plus className="w-3 h-3 text-white/60" />
                            </button>
                          </div>
                          <span className="text-white font-bold text-sm">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.cartId)} className="p-1.5 text-white/30 hover:text-red-400 self-start transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'details' && (
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3 p-4 bg-[#ff6b35]/10 rounded-xl border border-[#ff6b35]/20">
                <MapPin className="w-5 h-5 text-[#ff6b35]" />
                <div>
                  <p className="text-white text-sm font-medium">Nigeria Delivery</p>
                  <p className="text-white/40 text-xs">We deliver to all 36 states + FCT</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input type="text" placeholder="Full Name" value={orderDetails.name} onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:border-[#ff6b35] focus:outline-none transition-colors" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" value={orderDetails.email} onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:border-[#ff6b35] focus:outline-none transition-colors" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number (11 digits)" value={orderDetails.phone} onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none transition-colors ${phoneError ? 'border-red-500' : 'border-white/10 focus:border-[#ff6b35]'}`} />
                  {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
                  <p className="text-white/30 text-xs mt-1">Format: 080XXXXXXXX</p>
                </div>
                <div>
                  <input type="text" placeholder="Delivery Address (Street, House/Apartment number)" value={orderDetails.address} onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:border-[#ff6b35] focus:outline-none transition-colors" />
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] text-xs mt-1 inline-block hover:underline">
                    Open Google Maps to find your address
                  </a>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <select value={orderDetails.state} onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none cursor-pointer focus:border-[#ff6b35] focus:outline-none transition-colors pr-10">
                      <option value="" className="bg-[#1a1a1a] text-white/30">Select State</option>
                      {nigerianStatesList.map(state => (
                        <option key={state} value={state} className="bg-[#1a1a1a] text-white">{state}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                  <div className="relative flex-1">
                    <select value={orderDetails.city} onChange={(e) => setOrderDetails({...orderDetails, city: e.target.value})}
                      disabled={!orderDetails.state}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none cursor-pointer focus:border-[#ff6b35] focus:outline-none transition-colors pr-10 disabled:opacity-50 disabled:cursor-not-allowed">
                      <option value="" className="bg-[#1a1a1a] text-white/30">{orderDetails.state ? 'Select City' : 'Select state first'}</option>
                      {availableCities.map(city => (
                        <option key={city} value={city} className="bg-[#1a1a1a] text-white">{city}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <div className="p-6 space-y-5">
              <div className="space-y-3">
                <button onClick={() => setPaymentMethod('transfer')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${paymentMethod === 'transfer' ? 'border-[#ff6b35] bg-[#ff6b35]/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'transfer' ? 'bg-[#ff6b35]/20' : 'bg-white/10'}`}>
                      <CreditCard className={`w-5 h-5 ${paymentMethod === 'transfer' ? 'text-[#ff6b35]' : 'text-white/60'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-medium">Bank Transfer</p>
                      <p className="text-white/40 text-sm">GTBank · 0123456789</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'transfer' ? 'border-[#ff6b35] bg-[#ff6b35]' : 'border-white/30'}`}>
                      {paymentMethod === 'transfer' && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </button>

                <button onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-[#ff6b35] bg-[#ff6b35]/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-[#ff6b35]/20' : 'bg-white/10'}`}>
                      <Package className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-[#ff6b35]' : 'text-white/60'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-medium">Cash on Delivery</p>
                      <p className="text-white/40 text-sm">Pay when you receive</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-[#ff6b35] bg-[#ff6b35]' : 'border-white/30'}`}>
                      {paymentMethod === 'cod' && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </button>
              </div>

              {paymentMethod === 'transfer' && (
                <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#ff6b35]/5 border border-[#ff6b35]/30 rounded-2xl p-5">
                  <p className="text-white/60 text-sm mb-1">Amount to Transfer</p>
                  <p className="text-[#ff6b35] text-3xl font-bold">₦{grandTotal.toLocaleString()}</p>
                  <p className="text-white/40 text-xs mt-3">Send proof of payment to our WhatsApp after transferring</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/60 text-sm mb-1">Amount to Pay on Delivery</p>
                  <p className="text-white text-3xl font-bold">₦{grandTotal.toLocaleString()}</p>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Check className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="font-display text-2xl text-white mb-3">Order Placed!</h3>
              <p className="text-white/50 text-sm mb-2">Thank you for your order</p>
              <p className="text-white/30 text-xs">Check your email and WhatsApp for confirmation</p>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-[#1a1a1a]">
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Delivery</span>
                  <span className="text-white/50">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-[#ff6b35] text-xl font-bold">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <button onClick={handleCheckout}
                className="w-full bg-[#ff6b35] text-white py-4 rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#ff6b35]/20">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {checkoutStep === 'details' && (
            <div className="p-6">
              <button onClick={handleContinueToPayment}
                className="w-full bg-[#ff6b35] text-white py-4 rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors shadow-lg shadow-[#ff6b35]/20">
                Continue to Payment
              </button>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Total</span>
                <span className="text-white font-semibold">₦{grandTotal.toLocaleString()}</span>
              </div>
              <button onClick={handlePlaceOrder} disabled={isSubmitting}
                className="w-full bg-[#ff6b35] text-white py-4 rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors shadow-lg shadow-[#ff6b35]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
