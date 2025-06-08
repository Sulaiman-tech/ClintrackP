const bands = {
  band1: { room: "", name: "", age: "", allergies: "", medicines: "", photo: "" },
  band2: { room: "", name: "", age: "", allergies: "", medicines: "", photo: "" }
};

let selectedBand = null;

document.getElementById("band1").addEventListener("click", () => loadForm("band1"));
document.getElementById("band2").addEventListener("click", () => loadForm("band2"));

function loadForm(bandId) {
  selectedBand = bandId;
  const data = bands[bandId];
  document.getElementById("roomNumber").value = data.room;
  document.getElementById("patientName").value = data.name;
  document.getElementById("patientAge").value = data.age;
  document.getElementById("patientAllergies").value = data.allergies;
  document.getElementById("patientMedicines").value = data.medicines;
}

document.getElementById("patientForm").addEventListener("submit", function(e) {
  e.preventDefault();
  if (!selectedBand) return alert("Please select a ClinTrack band first.");
  bands[selectedBand].room = document.getElementById("roomNumber").value;
  bands[selectedBand].name = document.getElementById("patientName").value;
  bands[selectedBand].age = document.getElementById("patientAge").value;
  bands[selectedBand].allergies = document.getElementById("patientAllergies").value;
  bands[selectedBand].medicines = document.getElementById("patientMedicines").value;
  alert("Patient data updated for " + selectedBand);
});

// دعم السحب بالماوس واللمس
function makeDraggable(el) {
  let offsetX, offsetY;

  const onMove = (e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    el.style.left = clientX - offsetX + "px";
    el.style.top = clientY - offsetY + "px";
  };

  const onEnd = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onEnd);
  };

  const onStart = (e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = el.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
  };

  el.addEventListener("mousedown", onStart);
  el.addEventListener("touchstart", onStart);
}

makeDraggable(document.getElementById("band1"));
makeDraggable(document.getElementById("band2"));