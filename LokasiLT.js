/* ============================================================
   LokasiLT.js - Peta Titik Lokasi Lampu Tempel Dishub Konawe
   Data dari Excel: Data LPJU Kabupaten Konawe 2026
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
       1. DATA LAMPU TEMPEL
       ============================================
       Kategori kondisi:
       - "Baik/Menyala"        → kondisi: "baik"
       - "Mati/Tidak Menyala"  → kondisi: "rusak"
       ============================================ */
    const lampuData = [
        { id: "LT-001", kecamatan: "Sampara", desa: "Andaroa", lampu: "Mercuri", kondisi: "rusak", lat: -3.977851, lng: 122.415548 },
        { id: "LT-002", kecamatan: "Sampara", desa: "Andaroa", lampu: "Mercuri", kondisi: "baik", lat: -3.976972, lng: 122.418864 },
        { id: "LT-003", kecamatan: "Sampara", desa: "Pohara", lampu: "Mercuri", kondisi: "rusak", lat: -3.981254, lng: 122.394630 },
        { id: "LT-004", kecamatan: "Sampara", desa: "Rawua", lampu: "Mercuri", kondisi: "rusak", lat: -3.984242, lng: 122.406910 },
        { id: "LT-005", kecamatan: "Sampara", desa: "Rawua", lampu: "Mercuri", kondisi: "rusak", lat: -3.984160, lng: 122.403031 },
        { id: "LT-006", kecamatan: "Sampara", desa: "Sampara", lampu: "Mercuri", kondisi: "rusak", lat: -3.983382, lng: 122.401062 },
        { id: "LT-007", kecamatan: "Sampara", desa: "Sampara", lampu: "Mercuri", kondisi: "rusak", lat: -3.983840, lng: 122.402400 },
        { id: "LT-008", kecamatan: "Amonggedo", desa: "Amonggedo baru", lampu: "Mercuri", kondisi: "rusak", lat: -3.887120, lng: 122.225353 },
        { id: "LT-009", kecamatan: "Amonggedo", desa: "Amonggedo baru", lampu: "Mercuri", kondisi: "rusak", lat: -3.884288, lng: 122.225651 },
        { id: "LT-010", kecamatan: "Amonggedo", desa: "Amonggedo baru", lampu: "Mercuri", kondisi: "rusak", lat: -3.885585, lng: 122.225649 },
        { id: "LT-011", kecamatan: "Amonggedo", desa: "Benua", lampu: "LED", kondisi: "baik", lat: -3.911412, lng: 122.224744 },
        { id: "LT-012", kecamatan: "Amonggedo", desa: "Benua", lampu: "Mercuri", kondisi: "rusak", lat: -3.911439, lng: 122.225195 },
        { id: "LT-013", kecamatan: "Amonggedo", desa: "Benua", lampu: "Mercuri", kondisi: "rusak", lat: -3.911873, lng: 122.226715 },
        { id: "LT-014", kecamatan: "Amonggedo", desa: "Benua", lampu: "LED", kondisi: "baik", lat: -3.911858, lng: 122.224826 },
        { id: "LT-015", kecamatan: "Amonggedo", desa: "Dungua", lampu: "Mercuri", kondisi: "rusak", lat: -3.922402, lng: 122.229383 },
        { id: "LT-016", kecamatan: "Amonggedo", desa: "Dungua", lampu: "Mercuri", kondisi: "rusak", lat: -3.921602, lng: 122.229040 },
        { id: "LT-017", kecamatan: "Amonggedo", desa: "Dungua", lampu: "Mercuri", kondisi: "baik", lat: -3.921323, lng: 122.228904 },
        { id: "LT-018", kecamatan: "Amonggedo", desa: "Dungua", lampu: "Mercuri", kondisi: "rusak", lat: -3.924151, lng: 122.230102 },
        { id: "LT-019", kecamatan: "Amonggedo", desa: "Amonggedo", lampu: "Mercuri", kondisi: "rusak", lat: -3.913819, lng: 122.229771 },
        { id: "LT-020", kecamatan: "Amonggedo", desa: "Mataiwoi", lampu: "Mercuri", kondisi: "rusak", lat: -3.878707, lng: 122.224912 },
        { id: "LT-021", kecamatan: "Amonggedo", desa: "Mataiwoi", lampu: "Mercuri", kondisi: "rusak", lat: 3.868216, lng: 122.223187 },
        { id: "LT-022", kecamatan: "Amonggedo", desa: "Mendikonu", lampu: "Mercuri", kondisi: "rusak", lat: -3.907594, lng: 122.231136 },
        { id: "LT-023", kecamatan: "Amonggedo", desa: "Mendikonu", lampu: "Mercuri", kondisi: "rusak", lat: -3.904164, lng: 122.229226 },
        { id: "LT-024", kecamatan: "Amonggedo", desa: "Mendikonu", lampu: "Mercuri", kondisi: "rusak", lat: -3.902683, lng: 122.229024 },
        { id: "LT-025", kecamatan: "Amonggedo", desa: "Mendikonu", lampu: "Mercuri", kondisi: "rusak", lat: -3.902694, lng: 122.229028 },
        { id: "LT-026", kecamatan: "Anggalomoare", desa: "Anggalomoare", lampu: "Mercuri", kondisi: "rusak", lat: -3.967382, lng: 122.432065 },
        { id: "LT-027", kecamatan: "Anggalomoare", desa: "Lasoso", lampu: "Mercuri", kondisi: "rusak", lat: -3.964460, lng: 122.435121 },
        { id: "LT-028", kecamatan: "Anggalomoare", desa: "Lasoso", lampu: "Mercuri", kondisi: "baik", lat: -3.964945, lng: 122.438479 },
        { id: "LT-029", kecamatan: "Besulutu", desa: "Asunde", lampu: "Mercuri", kondisi: "rusak", lat: -3.964318, lng: 122.325577 },
        { id: "LT-030", kecamatan: "Besulutu", desa: "Besulutu", lampu: "Mercuri", kondisi: "rusak", lat: -3.965238, lng: 122.331849 },
        { id: "LT-031", kecamatan: "Besulutu", desa: "Lalomera", lampu: "Mercuri", kondisi: "rusak", lat: -3.975536, lng: 122.359868 },
        { id: "LT-032", kecamatan: "Besulutu", desa: "Onembute", lampu: "Mercuri", kondisi: "rusak", lat: -3.965581, lng: 122.333736 },
        { id: "LT-033", kecamatan: "Besulutu", desa: "Onembute", lampu: "Mercuri", kondisi: "rusak", lat: -3.964047, lng: 122.338259 },
        { id: "LT-034", kecamatan: "Meluhu", desa: "Ahuhu", lampu: "Mercuri", kondisi: "rusak", lat: -3.825968, lng: 122.186524 },
        { id: "LT-035", kecamatan: "Meluhu", desa: "Ahuloa", lampu: "LED", kondisi: "baik", lat: -3.829080, lng: 122.184066 },
        { id: "LT-036", kecamatan: "Meluhu", desa: "Ahuloa", lampu: "LED", kondisi: "baik", lat: -3.828323, lng: 122.184663 },
        { id: "LT-037", kecamatan: "Meluhu", desa: "Sumbasule", lampu: "Mercuri", kondisi: "rusak", lat: -3.820965, lng: 122.189834 },
        { id: "LT-038", kecamatan: "Meluhu", desa: "Sumbasule", lampu: "LED", kondisi: "baik", lat: -3.820737, lng: 122.191230 },
        { id: "LT-039", kecamatan: "Meluhu", desa: "Meluhu", lampu: "Mercuri", kondisi: "rusak", lat: -3.815284, lng: 122.185516 },
        { id: "LT-040", kecamatan: "Meluhu", desa: "Meluhu", lampu: "Mercuri", kondisi: "baik", lat: -3.807251, lng: 122.186644 },
        { id: "LT-041", kecamatan: "Wonggeduku", desa: "Ambuwiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.945817, lng: 122.123466 },
        { id: "LT-042", kecamatan: "Wonggeduku", desa: "Ambuwiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.944500, lng: 122.121143 },
        { id: "LT-043", kecamatan: "Wonggeduku", desa: "Baruga", lampu: "Mercuri", kondisi: "rusak", lat: -3.929574, lng: 122.138750 },
        { id: "LT-044", kecamatan: "Wonggeduku", desa: "Baruga", lampu: "Mercuri", kondisi: "rusak", lat: -3.933696, lng: 122.136669 },
        { id: "LT-045", kecamatan: "Wonggeduku", desa: "Baruga", lampu: "Mercuri", kondisi: "rusak", lat: -3.938114, lng: 122.134351 },
        { id: "LT-046", kecamatan: "Wonggeduku", desa: "Baruga", lampu: "Mercuri", kondisi: "rusak", lat: -3.934914, lng: 122.136054 },
        { id: "LT-047", kecamatan: "Wonggeduku", desa: "Bendewuta", lampu: "Mercuri", kondisi: "rusak", lat: -3.962729, lng: 122.184649 },
        { id: "LT-048", kecamatan: "Wonggeduku", desa: "Lalousu", lampu: "Mercuri", kondisi: "rusak", lat: -3.925506, lng: 122.185309 },
        { id: "LT-049", kecamatan: "Wonggeduku", desa: "Langgonawe", lampu: "Mercuri", kondisi: "rusak", lat: -3.948382, lng: 122.184482 },
        { id: "LT-050", kecamatan: "Wonggeduku", desa: "Tetemotaha", lampu: "Mercuri", kondisi: "rusak", lat: -3.921552, lng: 122.185566 },
        { id: "LT-051", kecamatan: "Wonggeduku", desa: "Teteona", lampu: "Mercuri", kondisi: "rusak", lat: -3.942943, lng: 122.131734 },
        { id: "LT-052", kecamatan: "Wonggeduku", desa: "Teteona", lampu: "Mercuri", kondisi: "rusak", lat: -3.948274, lng: 122.128346 },
        { id: "LT-053", kecamatan: "Wonggeduku", desa: "Wawoone", lampu: "LED", kondisi: "rusak", lat: -3.945400, lng: 122.184660 },
        { id: "LT-054", kecamatan: "Wonggeduku", desa: "Wonua mbae", lampu: "Mercuri", kondisi: "baik", lat: -3.941073, lng: 122.114392 },
        { id: "LT-055", kecamatan: "Uepai", desa: "Amaroa", lampu: "Mercuri", kondisi: "rusak", lat: -3.888761, lng: 122.030297 },
        { id: "LT-056", kecamatan: "Uepai", desa: "Ameroro", lampu: "Mercuri", kondisi: "rusak", lat: -3.890424, lng: 122.039812 },
        { id: "LT-057", kecamatan: "Uepai", desa: "Ameroro", lampu: "Mercuri", kondisi: "rusak", lat: -3.891659, lng: 122.039632 },
        { id: "LT-058", kecamatan: "Uepai", desa: "Anggopiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.881806, lng: 122.037472 },
        { id: "LT-059", kecamatan: "Uepai", desa: "Anggopiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.877698, lng: 122.039646 },
        { id: "LT-060", kecamatan: "Uepai", desa: "Anggopiu", lampu: "LED", kondisi: "baik", lat: -3.880302, lng: 122.040186 },
        { id: "LT-061", kecamatan: "Uepai", desa: "Anggopiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.881663, lng: 122.034170 },
        { id: "LT-062", kecamatan: "Uepai", desa: "Anggopiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.881608, lng: 122.038856 },
        { id: "LT-063", kecamatan: "Uepai", desa: "Anggopiu", lampu: "Mercuri", kondisi: "rusak", lat: -3.882034, lng: 122.036629 },
        { id: "LT-064", kecamatan: "Uepai", desa: "Rawua", lampu: "LED", kondisi: "baik", lat: -3.885111, lng: 122.027639 },
        { id: "LT-065", kecamatan: "Uepai", desa: "Rawua", lampu: "Mercuri", kondisi: "rusak", lat: -3.888185, lng: 122.034357 },
        { id: "LT-066", kecamatan: "Uepai", desa: "Rawua", lampu: "Mercuri", kondisi: "rusak", lat: -3.888827, lng: 122.035908 },
        { id: "LT-067", kecamatan: "Uepai", desa: "Rawua", lampu: "Mercuri", kondisi: "rusak", lat: -3.888732, lng: 122.036277 },
        { id: "LT-068", kecamatan: "Uepai", desa: "Tamesandi", lampu: "Mercuri", kondisi: "rusak", lat: -3.888812, lng: 122.036071 },
        { id: "LT-069", kecamatan: "Uepai", desa: "Tamesandi", lampu: "LED", kondisi: "baik", lat: -3.888044, lng: 122.031026 },
        { id: "LT-070", kecamatan: "Uepai", desa: "Uepai", lampu: "Mercuri", kondisi: "rusak", lat: -3.909167, lng: 122.065389 },
        { id: "LT-071", kecamatan: "Uepai", desa: "Uepai", lampu: "Mercuri", kondisi: "rusak", lat: -3.904028, lng: 122.053722 },
        { id: "LT-072", kecamatan: "Uepai", desa: "Uepai", lampu: "Mercuri", kondisi: "rusak", lat: -3.908637, lng: 122.066534 },
        { id: "LT-073", kecamatan: "Uepai", desa: "Tawarotebota", lampu: "Mercuri", kondisi: "rusak", lat: -3.914838, lng: 122.063492 },
        { id: "LT-074", kecamatan: "Uepai", desa: "Tawarotebota", lampu: "LED", kondisi: "baik", lat: -3.920522, lng: 122.062417 },
        { id: "LT-075", kecamatan: "Lambuya", desa: "Awuliti", lampu: "Mercuri", kondisi: "rusak", lat: -3.965507, lng: 122.078397 },
        { id: "LT-076", kecamatan: "Lambuya", desa: "Awuliti", lampu: "Mercuri", kondisi: "rusak", lat: -3.964727, lng: 122.078084 },
        { id: "LT-077", kecamatan: "Lambuya", desa: "Awuliti", lampu: "LED", kondisi: "baik", lat: -3.966393, lng: 122.075408 },
        { id: "LT-078", kecamatan: "Lambuya", desa: "Lambuya", lampu: "Mercuri", kondisi: "baik", lat: -3.955970, lng: 122.073083 },
        { id: "LT-079", kecamatan: "Lambuya", desa: "Lambuya", lampu: "LED", kondisi: "baik", lat: -3.957290, lng: 122.074087 },
        { id: "LT-080", kecamatan: "Lambuya", desa: "Lambuya", lampu: "Mercuri", kondisi: "baik", lat: -3.981512, lng: 122.076949 },
        { id: "LT-081", kecamatan: "Lambuya", desa: "Lambuya", lampu: "Mercuri", kondisi: "rusak", lat: -3.958131, lng: 122.072816 },
        { id: "LT-082", kecamatan: "Lambuya", desa: "Meraka", lampu: "Mercuri", kondisi: "rusak", lat: -3.972913, lng: 122.076276 },
        { id: "LT-083", kecamatan: "Lambuya", desa: "Meraka", lampu: "Mercuri", kondisi: "rusak", lat: -3.981832, lng: 122.076958 },
        { id: "LT-084", kecamatan: "Lambuya", desa: "Tetewatu", lampu: "Mercuri", kondisi: "rusak", lat: -4.056752, lng: 122.114657 },
        { id: "LT-085", kecamatan: "Lambuya", desa: "Tetewatu", lampu: "Mercuri", kondisi: "rusak", lat: -4.056750, lng: 122.114667 },
        { id: "LT-086", kecamatan: "Lambuya", desa: "Wonuahoa", lampu: "LED", kondisi: "baik", lat: -3.942883, lng: 122.067578 },
        { id: "LT-087", kecamatan: "Lambuya", desa: "Wonuahoa", lampu: "Mercuri", kondisi: "rusak", lat: -3.942972, lng: 122.067833 },
        { id: "LT-088", kecamatan: "Lambuya", desa: "Amberi", lampu: "LED", kondisi: "baik", lat: -3.970256, lng: 122.065795 },
        { id: "LT-089", kecamatan: "Lambuya", desa: "Amberi", lampu: "Mercuri", kondisi: "rusak", lat: -3.974277, lng: 122.05858 },
        { id: "LT-090", kecamatan: "Lambuya", desa: "Amberi", lampu: "Mercuri", kondisi: "rusak", lat: -3.974455, lng: 122.058357 },
        { id: "LT-091", kecamatan: "Puriala", desa: "Sonai", lampu: "Mercuri", kondisi: "rusak", lat: -4.031613, lng: 122.122320 },
        { id: "LT-092", kecamatan: "Puriala", desa: "Sonai", lampu: "Mercuri", kondisi: "rusak", lat: -4.030047, lng: 122.122597 },
        { id: "LT-093", kecamatan: "Puriala", desa: "Tetewatu", lampu: "Mercuri", kondisi: "rusak", lat: -4.056752, lng: 122.114657 },
        { id: "LT-094", kecamatan: "Puriala", desa: "Watundehoa", lampu: "Mercuri", kondisi: "rusak", lat: -4.044817, lng: 122.116922 },
        { id: "LT-095", kecamatan: "Puriala", desa: "Watusa", lampu: "Mercuri", kondisi: "rusak", lat: -4.036618, lng: 122.120923 },
        { id: "LT-096", kecamatan: "Wawotobi", desa: "Analahambuti", lampu: "Mercuri", kondisi: "rusak", lat: -3.846882, lng: 122.132029 },
        { id: "LT-097", kecamatan: "Wawotobi", desa: "Anggotoa", lampu: "Mercuri", kondisi: "rusak", lat: -3.837588, lng: 122.133280 },
        { id: "LT-098", kecamatan: "Wawotobi", desa: "Inalahi", lampu: "Mercuri", kondisi: "baik", lat: -3.871460, lng: 122.104789 },
        { id: "LT-099", kecamatan: "Wawotobi", desa: "Inalahi", lampu: "Mercuri", kondisi: "baik", lat: -3.870188, lng: 122.112988 },
        { id: "LT-100", kecamatan: "Wawotobi", desa: "Inalahi", lampu: "Mercuri", kondisi: "baik", lat: -3.872081, lng: 122.113043 },
        { id: "LT-101", kecamatan: "Wawotobi", desa: "Inalahi", lampu: "Mercuri", kondisi: "rusak", lat: -3.874784, lng: 122.113314 },
        { id: "LT-102", kecamatan: "Wawotobi", desa: "Inalahi", lampu: "Mercuri", kondisi: "rusak", lat: -3.870204, lng: 122.112044 },
        { id: "LT-103", kecamatan: "Wawotobi", desa: "Inalahi", lampu: "LED", kondisi: "baik", lat: -3.867876, lng: 122.113268 },
        { id: "LT-104", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "LED", kondisi: "baik", lat: -3.862628, lng: 122.115019 },
        { id: "LT-105", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "Mercuri", kondisi: "baik", lat: -3.865273, lng: 122.114225 },
        { id: "LT-106", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "LED", kondisi: "baik", lat: -3.859572, lng: 122.115979 },
        { id: "LT-107", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "Mercuri", kondisi: "baik", lat: -3.863731, lng: 122.113054 },
        { id: "LT-108", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "Mercuri", kondisi: "baik", lat: -3.862867, lng: 122.112094 },
        { id: "LT-109", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "Mercuri", kondisi: "baik", lat: -3.862731, lng: 122.111697 },
        { id: "LT-110", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "LED", kondisi: "baik", lat: -3.865759, lng: 122.113986 },
        { id: "LT-111", kecamatan: "Wawotobi", desa: "Inolobu", lampu: "LED", kondisi: "baik", lat: -3.866894, lng: 122.113380 },
        { id: "LT-112", kecamatan: "Wawotobi", desa: "Kasumewuho", lampu: "Mercuri", kondisi: "rusak", lat: -3.860380, lng: 122.097789 },
        { id: "LT-113", kecamatan: "Wawotobi", desa: "Kasumewuho", lampu: "Mercuri", kondisi: "rusak", lat: -3.850800, lng: 122.095221 },
        { id: "LT-114", kecamatan: "Wawotobi", desa: "Kasumewuho", lampu: "Mercuri", kondisi: "baik", lat: -3.849452, lng: 122.093528 },
        { id: "LT-115", kecamatan: "Wawotobi", desa: "Kasumewuho", lampu: "Mercuri", kondisi: "baik", lat: -3.858398, lng: 122.100570 },
        { id: "LT-116", kecamatan: "Wawotobi", desa: "Kukuluri", lampu: "Mercuri", kondisi: "rusak", lat: -3.834552, lng: 122.132604 },
        { id: "LT-117", kecamatan: "Wawotobi", desa: "Kulahi", lampu: "Mercuri", kondisi: "baik", lat: -3.862375, lng: 122.110322 },
        { id: "LT-118", kecamatan: "Wawotobi", desa: "Kulahi", lampu: "Mercuri", kondisi: "baik", lat: -3.861479, lng: 122.108877 },
        { id: "LT-119", kecamatan: "Wawotobi", desa: "Lalosabila", lampu: "Mercuri", kondisi: "baik", lat: -3.874546, lng: 122.104531 },
        { id: "LT-120", kecamatan: "Wawotobi", desa: "Lalosabila", lampu: "Mercuri", kondisi: "rusak", lat: -3.875886, lng: 122.104532 },
        { id: "LT-121", kecamatan: "Wawotobi", desa: "Lalosabila", lampu: "Mercuri", kondisi: "rusak", lat: -3.877248, lng: 122.104522 },
        { id: "LT-122", kecamatan: "Wawotobi", desa: "Palarahi", lampu: "Mercuri", kondisi: "baik", lat: -3.854036, lng: 122.125258 },
        { id: "LT-123", kecamatan: "Wawotobi", desa: "Palarahi", lampu: "Mercuri", kondisi: "baik", lat: -3.856174, lng: 122.118130 },
        { id: "LT-124", kecamatan: "Wawotobi", desa: "Palarahi", lampu: "Mercuri", kondisi: "rusak", lat: -3.858776, lng: 122.130915 },
        { id: "LT-125", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "baik", lat: -3.876778, lng: 122.113810 },
        { id: "LT-126", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "rusak", lat: -3.876635, lng: 122.112498 },
        { id: "LT-127", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "rusak", lat: -3.876788, lng: 122.111890 },
        { id: "LT-128", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "LED", kondisi: "rusak", lat: -3.877024, lng: 122.111317 },
        { id: "LT-129", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "rusak", lat: -3.877205, lng: 122.110922 },
        { id: "LT-130", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "baik", lat: -3.877163, lng: 122.110557 },
        { id: "LT-131", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "rusak", lat: -3.876836, lng: 122.109666 },
        { id: "LT-132", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "rusak", lat: -3.876510, lng: 122.108836 },
        { id: "LT-133", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "baik", lat: -3.875340, lng: 122.108921 },
        { id: "LT-134", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "baik", lat: -3.875399, lng: 122.111666 },
        { id: "LT-135", kecamatan: "Wawotobi", desa: "Wawotobi", lampu: "Mercuri", kondisi: "baik", lat: -3.876245, lng: 122.113752 }
    ];

    /* ============================================
       2. HITUNG STATISTIK
       ============================================ */
    const total = lampuData.length;
    const totalBaik = lampuData.filter(l => l.kondisi === 'baik').length;
    const totalRusak = lampuData.filter(l => l.kondisi === 'rusak').length;

    function animateNumber(elementId, target, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let current = 0;
        const increment = target / (duration / 20);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('id-ID');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('id-ID');
            }
        }, 20);
    }

    animateNumber('statTotal', total, 1500);
    animateNumber('statBaik', totalBaik, 1500);
    animateNumber('statRusak', totalRusak, 1500);

    /* ============================================
       3. RENDER DAFTAR LOKASI
       ============================================ */
    const lokasiList = document.getElementById('lokasiList');
    const totalLokasi = document.getElementById('totalLokasi');

    function renderLokasi(filter = 'all', keyword = '') {
        if (!lokasiList) return;

        const filtered = lampuData.filter(item => {
            const matchFilter = filter === 'all' || item.kondisi === filter;
            const kw = keyword.toLowerCase();
            const matchKeyword = keyword === '' ||
                item.id.toLowerCase().includes(kw) ||
                item.kecamatan.toLowerCase().includes(kw) ||
                item.desa.toLowerCase().includes(kw) ||
                item.lampu.toLowerCase().includes(kw);
            return matchFilter && matchKeyword;
        });

        lokasiList.innerHTML = '';

        if (filtered.length === 0) {
            lokasiList.innerHTML = `
                <div style="padding: 2rem 1rem; text-align: center; color: #64748b;">
                    <i class="fas fa-search" style="font-size: 2rem; opacity: 0.3; margin-bottom: 0.5rem; display: block;"></i>
                    <p style="font-size: 0.85rem;">Tidak ada lokasi ditemukan</p>
                </div>
            `;
        } else {
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'lokasi-item';
                div.setAttribute('data-kondisi', item.kondisi);

                const isBaik = item.kondisi === 'baik';
                const iconClass = isBaik ? 'baik' : 'rusak';
                const iconFA = isBaik ? 'fa-check-circle' : 'fa-times-circle';
                const badgeText = isBaik ? 'Menyala' : 'Padam';

                div.innerHTML = `
                    <div class="lokasi-icon ${iconClass}">
                        <i class="fas ${iconFA}"></i>
                    </div>
                    <div class="lokasi-info">
                        <div class="lokasi-id">
                            <i class="fas fa-lightbulb"></i> ${item.id}
                        </div>
                        <div class="lokasi-detail">
                            <strong>${item.desa}</strong>, Kec. ${item.kecamatan}<br>
                            <i class="fas fa-tag" style="color: #94a3b8; font-size: 0.7rem;"></i> ${item.lampu}
                        </div>
                    </div>
                    <span class="lokasi-badge ${iconClass}">
                        ${badgeText}
                    </span>
                `;

                // Klik item → buka Google Maps di tab baru
                div.addEventListener('click', function () {
                    const url = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
                    window.open(url, '_blank');
                });

                lokasiList.appendChild(div);
            });
        }

        if (totalLokasi) {
            totalLokasi.textContent = filtered.length;
        }
    }

    /* ============================================
       4. FILTER KATEGORI
       ============================================ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';
    let activeKeyword = '';

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            renderLokasi(activeFilter, activeKeyword);
        });
    });

    /* ============================================
       5. SEARCH INPUT
       ============================================ */
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            activeKeyword = this.value.trim();
            renderLokasi(activeFilter, activeKeyword);
        });
    }

    /* ============================================
       6. MOBILE MENU TOGGLE
       ============================================ */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat klik link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 860) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Tutup menu saat klik di luar
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 860 && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    /* ============================================
       7. FALLBACK LOGO
       ============================================ */
    const logoImg = document.getElementById('logoKonawe');
    if (logoImg) {
        logoImg.addEventListener('error', function () {
            this.style.display = 'none';
            const parent = this.closest('.logo-area');
            if (parent && !parent.querySelector('.logo-fallback')) {
                const fallback = document.createElement('span');
                fallback.className = 'logo-fallback';
                fallback.style.cssText = 'background:#fff;padding:10px;border-radius:12px;font-weight:bold;font-size:12px;color:#0b2b3b;';
                fallback.innerText = 'Logo Konawe';
                this.insertAdjacentElement('afterend', fallback);
            }
        });
    }

    /* ============================================
       8. INISIALISASI
       ============================================ */
    renderLokasi('all', '');

    console.log('✅ Halaman Lampu Tempel - Dishub Konawe siap');
    console.log(`📊 Total: ${total} titik | Baik: ${totalBaik} | Rusak: ${totalRusak}`);
});