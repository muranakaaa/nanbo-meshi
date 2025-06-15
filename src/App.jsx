import { useState } from 'react'
import './App.css'

function App() {
  const [riceWeight, setRiceWeight] = useState('')
  const [ricePrice, setRicePrice] = useState('')
  const [bowlWeight, setBowlWeight] = useState('150')
  const [pricePerMeal, setPricePerMeal] = useState(null)
  const [totalBowls, setTotalBowls] = useState(null)

  const calculatePrice = () => {
    const weightKg = parseFloat(riceWeight)
    const price = parseFloat(ricePrice)
    const bowlG = parseFloat(bowlWeight)

    if (weightKg && price && bowlG) {
      const cookedRiceG = weightKg * 2.2 * 1000
      const bowlsRaw = cookedRiceG / bowlG
      const bowlsRounded = Math.round(bowlsRaw)
      console.log(price)
      console.log(bowlsRaw)
      const priceRaw = price / bowlsRaw
      console.log(priceRaw)
      const priceRounded = Math.round(priceRaw)

      setPricePerMeal(priceRounded)
      setTotalBowls(bowlsRounded)
    } else {
      setPricePerMeal(null)
      setTotalBowls(null)
    }
  }

  const clearResult = () => {
    setPricePerMeal(null)
    setTotalBowls(null)
  }

  const shareToTwitter = () => {
    if (pricePerMeal !== null) {
      const text = `なんぼめしで計算したら、お茶碗1杯のお米は${pricePerMeal}円でした！全部で${totalBowls}杯分です。 #なんぼめし`
      const url = 'https://nanbo-meshi.example.com'
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, '_blank')
    }
  }

  return (
    <div className="App">
      <h1>🍚 なんぼめし</h1>
      <p>お米の価格から一食あたりの価格を計算できるサイトです。</p>
      
      <div style={{
        backgroundColor: '#E2E3E5',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
        color: '#495057'
      }}>
        <span style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '0.2rem 0.5rem',
          borderRadius: '3px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          おしらせ
        </span> 計算の処理速度を向上しました👍 2025年6月15日
      </div>

      <div className="card">
        <div className="form-group">
          <label htmlFor="riceWeight">お米の重量（kg）</label>
          <input
            id="riceWeight"
            type="number"
            value={riceWeight}
            onChange={(e) => setRiceWeight(e.target.value)}
            onFocus={clearResult}
            placeholder="例: 5"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ricePrice">お米の価格（円）</label>
          <input
            id="ricePrice"
            type="number"
            value={ricePrice}
            onChange={(e) => setRicePrice(e.target.value)}
            onFocus={clearResult}
            placeholder="例: 2000"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bowlWeight">お茶碗1杯の重量（g）</label>
          <input
            id="bowlWeight"
            type="number"
            value={bowlWeight}
            onChange={(e) => setBowlWeight(e.target.value)}
            onFocus={clearResult}
            placeholder="例: 150"
            step="1"
          />
        </div>

        <button 
          onClick={calculatePrice}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            marginTop: '1rem',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
        >
          🍚 計算する
        </button>

        {pricePerMeal !== null && (
          <div className="result">
            <div style={{ color: 'white' }}>お茶碗1杯当たり: <strong>{pricePerMeal}円</strong></div>
            <div style={{ color: 'white', marginTop: '0.5rem' }}>お茶碗<strong>{totalBowls}杯分</strong></div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.8rem', marginTop: '0.8rem' }}>
              杯数 = ({riceWeight}kg × 1000g × 2.2) ÷ {bowlWeight}g = {Math.round((parseFloat(riceWeight) * 1000 * 2.2) / parseFloat(bowlWeight))}杯<br />
              1杯当たり = {ricePrice}円 ÷ 杯数 = {pricePerMeal}円
            </div>
            <button className="share-button" onClick={shareToTwitter}>
              🐦 Twitterでシェア
            </button>
            <div style={{
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginTop: '0.8rem',
              lineHeight: '1.4'
            }}>
              ※お米を炊くと、水を吸って膨らむため、重さは約2.2倍になります。参考：<a 
                href="https://www.maff.go.jp/j/heya/kodomo_sodan/0103/01.html" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'underline'
                }}
              >
                農林水産省
              </a>
            </div>
          </div>
        )}
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        fontSize: '0.8rem',
        color: '#7f8c8d'
      }}>
        開発者：<a 
          href="https://x.com/ayatakaa_chan" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#3498db',
            textDecoration: 'none'
          }}
        >
          @ayatakaa_chan
        </a>
      </div>
    </div>
  )
}

export default App
