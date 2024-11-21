let intervalId;
let checkedCount = 0;
const targetCount = 1000000; // Örnek limit
let startClicked = false;

// Verilen kelimeler listesi
const words = [
    "crypto", "blockchain", "wallet", "bitcoin", "ethereum", "node", "transaction", "address", 
    "hash", "token", "mining", "ledger", "decentralized", "altcoin", "consensus", "proof", 
    "stake", "chain", "smart", "contract", "fitness", "training", "exercise", "health", "strength",
    "gym", "workout", "nutrition", "cardio", "stamina", "yoga", "climbing", "skiing", "football"
];

// 12 kelimeden oluşan rastgele adres oluşturma fonksiyonu
function generateRandomWords() {
    const usedWords = new Set();
    const randomWords = [];
    while (randomWords.length < 12) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        if (!usedWords.has(word)) {
            usedWords.add(word);
            randomWords.push(word);
        }
    }
    return randomWords.join(' ');
}

// Tarama başlatma fonksiyonu
function startScan() {
    if (startClicked) return;
    startClicked = true;

    intervalId = setInterval(() => {
        checkedCount++;
        const scanResults = document.getElementById('scan-results');
        const newScan = document.createElement('p');
        newScan.style.fontSize = '12px';
        newScan.style.color = "white";
        
        // Cüzdan adresi
        const walletText = document.createElement('span');
        walletText.textContent = `Wallet | ETH: `;
        walletText.style.color = "green";

        const randomWords = generateRandomWords();
        newScan.appendChild(walletText);
        newScan.appendChild(document.createTextNode(randomWords));

        // Kazanç bulunma simülasyonu
        if (Math.random() < 0.0001) {  // %0001 şansla bakiye bulunur
            const foundAmount = (Math.random() * (0.01 - 0.001) + 0.001).toFixed(6);
            const foundBox = document.querySelector('.found-box');
            const foundAmountSpan = document.getElementById('found-amount');
            const foundWordsDiv = document.getElementById('found-words');
            const foundLogo = document.getElementById('found-logo');

            // Bulunan bilgileri güncelle
            foundAmountSpan.textContent = `${foundAmount} ETH`;
            foundLogo.style.display = 'inline';
            foundLogo.src = "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035"; // Logoyu ekliyoruz
            foundLogo.alt = "eth Logo";
            foundWordsDiv.textContent = randomWords;

            // Kazanç ve cüzdan bilgisini "found.txt" dosyasına kaydet
            saveFoundAmount(randomWords, foundAmount);

            // Taramayı durdur
            clearInterval(intervalId);
        }

        scanResults.appendChild(newScan);
        scanResults.scrollTop = scanResults.scrollHeight; // Otomatik kaydırma
        document.getElementById('checked').textContent = `Total Inspection: ${checkedCount}`;
    }, 70);
}

// Tarama durdurma fonksiyonu
function stopScan() {
    clearInterval(intervalId);
    startClicked = false;
}

// Kazancı ve cüzdan adresini "found.txt" dosyasına kaydetme fonksiyonu
function saveFoundAmount(walletAddress, amount) {
    const fileContent = `Wallet Address: ${walletAddress}\nAmount: ${amount} ETH\n\n`;
    
    const file = new Blob([fileContent], { type: 'text/plain' });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = "found.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// Event listener
document.getElementById('startBtn').addEventListener('click', startScan);
document.getElementById('stopBtn').addEventListener('click', stopScan);
