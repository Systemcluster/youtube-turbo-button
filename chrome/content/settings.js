function validate() {
	return document.getElementById("speed").checkValidity();
}

function save() {
	if(!validate()) {
		document.getElementById("submit").click();
		return;
	}

	var speed = Number.parseFloat(document.getElementById("speed").value);
	if(!isNaN(speed))
		chrome.storage.local.set({speed: speed}, ()=>{
			cancel();
		});
	else
		alert("invalid number: "+JSON.stringify(speed))
}
function load() {
	chrome.storage.local.get(["speed"], result =>{
		let speed = Number.parseFloat(result.speed);
		if(!isNaN(speed))
			document.getElementById("speed").value = speed;
	});
}
function cancel() {
	window.setTimeout(window.close, 2);
}
document.addEventListener("DOMContentLoaded", load);
document.getElementById("save").addEventListener("click", save);
document.getElementById("cancel").addEventListener("click", cancel);
window.addEventListener('keydown', function (e) {
	if (e.keyIdentifier == 'U+001B' || e.keyIdentifier == 'Escape' || e.keyCode == 27) {
		cancel();
		return false;
	}
	else if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
		if (e.target.nodeName == 'INPUT') {
			if(!validate()) {
				document.getElementById("submit").click();
			}
			else {
				window.setTimeout(()=>{
					save();
				}, 50)
			}
			e.preventDefault();
			return false;
		}
	}
	return true;
}, true);
