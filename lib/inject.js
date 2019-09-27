
chrome.runtime.sendMessage({method: "getSpeed"}, response => {
	const speed = Number.parseFloat(response.speed);
	console.info("Setting playback speed to", speed);
	if(isNaN(speed))
		return false;
	const videoContainer = document.getElementsByClassName("html5-main-video");
	if(!videoContainer)
		return false;
	const video = videoContainer[0];
	if(!video)
		return false;
	video.playbackRate = speed;
	return true;
})
