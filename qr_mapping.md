// This file documents the QR code image naming conventions and address mapping for the crypto deposit site.
// Place this file at the project root for easy reference.

/*
QR Code Image Naming Convention:
- All QR code images are stored in assets/qrcodes/
- Filenames match the format: <CRYPTO>(<NETWORK>).jpg
  Examples:
    BCH(BEP20).jpg
    BCH(Bitcoin Cash).jpg
    BCH(ERC20).jpg
    BTC.jpg
    DOGE (BEP20).jpg
    ETH (ERC20).jpg
    LTC(BEP20).jpg
    LTC(litecoin).jpg
    SOL(BEP20).jpg
    SOL(solana chain).jpg
    Trump(solana).jpg
    USDT(BEP20).jpg
    XRP(BEP20).jpg
    XRP(ERC20).jpg

Address Mapping (as used in scripts/script.js):

BCH(BEP20)         0x698c85935cf2fed76d596bbb533d2831eede9058
BCH(Bitcoin Cash)  1MnL9Ku1PG9ti6erSFtbu7BFecZNJDhCH4
BCH(ERC20)         0x698c85935cf2fed76d596bbb533d2831eede9058
BTC                0x698c85935cf2fed76d596bbb533d2831eede9058
DOGE(BEP20)        0x698c85935cf2fed76d596bbb533d2831eede9058
ETH(ERC20)         0x698c85935cf2fed76d596bbb533d2831eede9058
LTC(BEP20)         0x698c85935cf2fed76d596bbb533d2831eede9058
LTC(litecoin)      LTekL2psRuEk6tNXUd6ZjDoNZb8NBJLx6p
SOL(BEP20)         0x698c85935cf2fed76d596bbb533d2831eede9058
SOL(solana chain)  DhNbE4HHUGsBuoo8YPqCFJaoGG8AdFt2aEYUG9kG8qAx
Trump(solana)      DhNbE4HHUGsBuoo8YPqCFJaoGG8AdFt2aEYUG9kG8qAx
USDT(BEP20)        0x698c85935cf2fed76d596bbb533d2831eede9058
XRP(BEP20)         0x698c85935cf2fed76d596bbb533d2831eede9058
XRP(ERC20)         0x698c85935cf2fed76d596bbb533d2831eede9058

// If you add new coins or networks, follow the same naming and mapping convention.
