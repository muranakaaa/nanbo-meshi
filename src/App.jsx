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
      const priceRaw = price / bowlsRaw
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

  const postToSocial = () => {
    if (pricePerMeal !== null) {
      const text = `なんぼめしで計算したら、お茶碗1杯のお米は${pricePerMeal}円でした！全部で${totalBowls}杯分です。 #なんぼめし`
      const url = 'https://nanbo-meshi.com'
      const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text + '\n\n' + url)}`
      window.open(shareUrl, '_blank')
    }
  }

  return (
    <div className="App">
      <img 
        src="/nanbo-meshi_logo.webp" 
        alt="なんぼめし - ごはん1杯の値段計算サイト"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          maxHeight: '150px',
          display: 'block',
          margin: '0 auto 1rem'
        }}
      />
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'normal', color: '#666' }}>
        なんぼめし - ごはん1杯の値段計算サイト
      </h1>
      <p>お米の価格と量を入力すると、ごはん1杯の値段を計算できるサイトです。</p>
      
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
        </span> サイトデザインをリニューアルしました👍 2025年6月15日
      </div>

      <div className="card">
        <div className="form-group">
          <h2>お米の重量（kg）</h2>
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
          <h2>お米の価格（円）</h2>
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
          <h2>お茶碗1杯の重量（g）</h2>
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
            <button className="post-button" onClick={postToSocial}>
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
        <div style={{ marginBottom: '0.5rem' }}>
          <a 
            href="/terms" 
            style={{
              color: '#3498db',
              textDecoration: 'none',
              marginRight: '1rem'
            }}
            onClick={(e) => {
              e.preventDefault();
              alert(`利用規約

1. サービスについて
なんぼめしは、お米の価格から一食あたりの価格を計算するサービスです。

2. 免責事項
本サービスの計算結果は参考値であり、実際の価格とは異なる場合があります。
計算結果に基づく損害について、開発者は一切の責任を負いません。

3. プライバシー
本サービスでは個人情報の収集は行いません。
入力されたデータはブラウザ内のみで処理され、外部に送信されません。

4. 利用制限
本サービスを営利目的で利用することを禁止します。
サーバーに過度な負荷をかける行為を禁止します。

5. 変更・終了
開発者は事前の通知なくサービス内容の変更・終了を行う場合があります。

6. 準拠法
本規約は日本法に準拠し、日本の裁判所を専属的合意管轄裁判所とします。

最終更新日: 2025年6月15日`);
            }}
          >
            利用規約
          </a>
          <a 
            href="/privacy" 
            style={{
              color: '#3498db',
              textDecoration: 'none'
            }}
            onClick={(e) => {
              e.preventDefault();
              alert(`プライバシーポリシー

1. 収集する情報
本サービスでは個人を特定できる情報の収集は行いません。

2. データの処理
入力されたお米の重量・価格・お茶碗の重量は、すべてブラウザ内で処理され、外部のサーバーには送信されません。

3. Cookie
本サービスではCookieを使用しません。

4. 第三者への提供
収集した情報を第三者に提供することはありません。

5. アクセスログ
サーバーのアクセスログは、サービス改善の目的でのみ使用し、個人を特定する用途では使用しません。

6. お問い合わせ
プライバシーに関するお問い合わせは、開発者のTwitterアカウント(@ayatakaa_chan)までご連絡ください。

最終更新日: 2025年6月15日`);
            }}
          >
            プライバシーポリシー
          </a>
        </div>
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
