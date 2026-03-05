const batas = {
    normalRX : -25,
    warningRX : -28
}

function analisa(){

    let rx = parseFloat(document.getElementById("rx").value);
    let traffic = parseFloat(document.getElementById("traffic").value);
    let latency = parseFloat(document.getElementById("latency").value);
    let loss = parseFloat(document.getElementById("loss").value);

    let hasil = "";
    let saran = "";
    let diagnosa = "";
    let health = 100;

    // ===== ANALISA RX =====
    if(rx < batas.warningRX){
    hasil = "🔴 STATUS : DOWN";
    diagnosa = "Gangguan Jalur Fiber (ODP / ODC)";
    health = 20;

    saran =
    "Tracing kabel putus<br>" +
    "Replicing ulang<br>" +
    "Change core fiber<br>" +
    "Change port ODP";
}
else if(rx < batas.normalRX){
    hasil = "🟡 STATUS : WARNING";
    diagnosa = "Kemungkinan Problem Indoor";
    health = 60;

    saran =
    "Cleaning konektor<br>" +
    "Cek bending kabel<br>" +
    "Monitoring ulang";
}
else{
    hasil = "🟢 STATUS : NORMAL";
    diagnosa = "Jaringan Stabil";
    health = 100;

    saran = "Tidak perlu tindakan";
}

   // ===== ANALISA TRAFFIC =====
if(traffic == 0){
    hasil = "🔴 STATUS : CLIENT OFFLINE";
    diagnosa = "ONU / Modem Mati";
    health = 10;

    saran =
    "Cek adaptor modem<br>" +
    "Pastikan ONU menyala<br>" +
    "Restart modem";
}

// ===== PACKET LOSS =====
else if(loss >= 5){
    hasil = "🟠 STATUS : UNSTABLE";
    diagnosa = "Packet Loss Tinggi";
    health = 50;

    saran =
    "Cek uplink<br>" +
    "Cek switch overload<br>" +
    "Monitoring traffic backbone";
}

// ===== LATENCY =====
else if(latency > 100){
    hasil = "🟠 STATUS : DELAY";
    diagnosa = "High Latency";
    health = 50;

    saran =
    "Cek routing<br>" +
    "Cek backbone ISP<br>" +
    "Tes ping ke gateway";
}

let output = document.getElementById("hasil");

output.innerHTML =
   hasil +
   "<br><br><b>Network Health :</b> " + health + "%" +
   "<br><br><b>Auto Diagnosa :</b><br>" +
   diagnosa +
   "<br><br><b>Recommendation Action :</b><br>" +
   saran;

    // ===== WARNA STATUS =====
    if(hasil.includes("DOWN") || hasil.includes("OFFLINE")){
        output.style.color = "red";
    }
    else if(hasil.includes("WARNING")){
        output.style.color = "yellow";
    }
    else{
        output.style.color = "lightgreen";
    }
}
// ===== SIMPAN KE HISTORY =====

let table = document.getElementById("history");

let row = table.insertRow(-1);

row.insertCell(0).innerHTML = rx;
row.insertCell(1).innerHTML = traffic;
row.insertCell(2).innerHTML = latency;
row.insertCell(3).innerHTML = loss;
row.insertCell(4).innerHTML = hasil;



