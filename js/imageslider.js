// Slides images smoothly.

// change these to affect the image slider:
SLIDER_WIDTH = 700; // pixels
SLIDER_HEIGHT = 500; // pixels
SLIDER_INTERVAL = 3; // seconds
SLIDER_BORDER_COLOR = '#444444'; // RGB value
SLIDER_DIV = 'image_slider';
SLIDER_BORDER_WIDTH_X = 10;
SLIDER_BORDER_WIDTH_Y = 5;
SLIDER_ANIM_SPEED = 10;
SLIDER_MOVE_SPEED = 75;

// Add pic sources to this list:
var picSources = [
	"images/img1.jpg",
	"images/img4.jpg",
	"images/img2.jpg",
	"images/img5.jpg",
	"images/img3.jpg",
	"images/img6.jpg"
];


// implementers: DO NOT EDIT BELOW HERE!













/**
 * Adds the slider to a parent div.
 *
 * @param parentId
 * The id of the div to add the slider to.
 */
function addSlider(parentId) {
	var parentElement = document.getElementById(parentId);
	parentElement.appendChild(imageSlider);
}

/**
 * Creates the image slider.
 *
 * @param imageSource
 * The source of the first image to
 * set the slider to display.
 *
 * @return
 * The newly-created slider div.
 */
function createSlider() {
	var slider = document.createElement('div');
	slider.appendChild(pics[0]);
		
	var s = slider.style;
	s.width = SLIDER_WIDTH + 'px';
	s.height = SLIDER_HEIGHT + 'px';
	s.position = 'relative';
	s.overflow = 'hidden';
	s.padding = SLIDER_BORDER_WIDTH_Y + 'px ' + SLIDER_BORDER_WIDTH_X + 'px';
	s.backgroundColor = SLIDER_BORDER_COLOR;
	
	return slider;
}

/**
 * Switches the image displayed in the slider.
 *
 * @param imageSrc
 * The source of the new image.
 */
function changeSliderImage(imgNum) {
	picHolder = pics[imgNum];
}

/**
 * Shows the next slider image.
 */
function showNextSliderImage() {
	prepareNextImage();
	setTimeout(addNextImage, 10);
	animationInterval = setInterval(slideImages, SLIDER_ANIM_SPEED);
}

function prepareNextImage() {
	pics[nextPicIndex].style.left = nextImageOffset + 'px';
	nextImageOffset = SLIDER_WIDTH + SLIDER_BORDER_WIDTH_X;
}

function startNextSlideDelay() {
	setTimeout(showNextSliderImage, SLIDER_INTERVAL * 1000);
}

function setNextImage() {
	nextImage = pics[nextPicIndex++];
	nextImage.style.position = 'absolute';
	nextImageOffset = SLIDER_WIDTH + SLIDER_BORDER_WIDTH_X;
	nextImage.style.left = nextImageOffset + 'px';
}

function createNextImage(picSrc) {
	nextImage.src = picSrc;
	nextImage.style.position = 'absolute';
	nextImageOffset = SLIDER_WIDTH + SLIDER_BORDER_WIDTH_X;
	nextImage.style.left = nextImageOffset + 'px';
}

function addNextImage() {
	imageSlider.appendChild(pics[nextPicIndex]);
}

function slideImages() {
	if(nextImageOffset == SLIDER_BORDER_WIDTH_X) {
		clearInterval(animationInterval);
		setTimeout(endAnim, 10);
	} else {
		if(nextImageOffset - SLIDER_MOVE_SPEED > SLIDER_BORDER_WIDTH_X) {
			addNextImageOffset(-SLIDER_MOVE_SPEED);
		} else {
			setNextImageOffset(SLIDER_BORDER_WIDTH_X);
		}
		addImageOffset(-SLIDER_MOVE_SPEED);
	}
}

function endAnim() {
	clearOldImage();
	imageOffset = 0;
	currentPicIndex++;
	nextPicIndex++;
	if(nextPicIndex == pics.length) {
		nextPicIndex = 0;
	}
	if(currentPicIndex == pics.length) {
		currentPicIndex = 0;
	}
	startNextSlideDelay();
}

function addNextImageOffset(howMuch) {
	nextImageOffset += howMuch;
	pics[nextPicIndex].style.left = nextImageOffset + 'px';
}

function addImageOffset(howMuch) {
	imageOffset += howMuch;
	pics[currentPicIndex].style.left = imageOffset + 'px';
}

function setImageOffset(offset) {
	imageOffset = offset;
	pics[currentPicIndex].style.left = imageOffset + 'px';
}

function setNextImageOffset(offset) {
	nextImageOffset = offset;
	pics[nextPicIndex].style.left = nextImageOffset + 'px';
}

function clearOldImage() {
	imageSlider.removeChild(pics[currentPicIndex]);
}

/**
 * Creates the slider. Only this function should be
 * changed once the slider is complete.
 */
function initializeSlider() {
	pics = new Array();
	for(var i = 0; i < picSources.length; i++) {
		pics[i] = new Image();
		pics[i].src = picSources[i];
		pics[i].width = SLIDER_WIDTH;
		pics[i].height = SLIDER_HEIGHT;
		pics[i].style.position = 'absolute';
		pics[i].style.left = SLIDER_BORDER_WIDTH_X + 'px';
	}
	currentPicIndex = 0;
	nextPicIndex = 1;
	nextImageSource = '';
	fadingOut = false;
	fadingPosition = 0;
	fadeInterval = null;
	nextImage = pics[1];
	nextImageOffset = 0;
	imageOffset = 0;
	animationInterval = null;
	imageSlider = createSlider();
	addSlider(SLIDER_DIV);
	startNextSlideDelay();
}

/**
 * Sets the style properties for the slider div.
 *
 * @param sliderDiv
 * The slider to set the style for.
 *
 * @return
 * The properly formatted slider.
 */
function setSliderStyle(sliderDiv) {
	sliderDiv.style.width = SLIDER_WIDTH + 'px';
	sliderDiv.style.height = SLIDER_HEIGHT + 'px';
	sliderDiv.style.backgroundColor = SLIDER_BORDER_COLOR;
	return sliderDiv;
}

function preloadImages() {
	var imgs = new Array();
	for(var i = 0; i < picSources.length; i++) {
		imgs[i] = new Image();
		imgs[i].src = picSources[i];
	}
}