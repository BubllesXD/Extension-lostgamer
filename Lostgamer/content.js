// May god have mercy on anyone who tries to decipher this code. I was fuled by caffine, rage and insomnia while writing it, and to make things worse my coding buddy was ChatGPT.

// Creating UI
var htmlContent = `
  <div class="styles_game-settings__aqqUO" style="margin-top: 1%; margin-bottom: -2%;">

    <div class="styles_game-setting-container__t_SMV styles_game-length-setting-container__VLKOn" style="margin-left:8.2%;">
      <label id="lbl_grs" class="styles_game-setting-label__eXPkD styles_label__iuUda" for="timeoutInput" style="color: white; font-size:18px;">Display time</label>
    
      <div class="timeoutInput-container" style="display: flex; flex-direction: column;">
      
        <div class="checkbox-item" style="display: flex; align-items: center;">
          <input type="number" class="styles_select__98ckz" id="timeoutInput" name="timeoutInput" min="0" step="0.05" max="99999999" required>
          <p style="color: white; font-size:18px; margin-bottom:1%;"><b>[sec]</b></p>
          <input type="checkbox" id="dt_checkbox" name="dt_checkbox" checked style="margin-left:-25.5%;" value="-1" title="enable/disable display time">
        </div>
      
      </div>
    </div>

    <div class="styles_game-setting-container__t_SMV styles_game-length-setting-container__VLKOn">
        <label id="lbl_grs" class="styles_game-setting-label__eXPkD styles_label__iuUda" for="opcije" style="color: white; font-size:18px;">Options</label>
        
        <div class="checkbox-container" style="display: flex; flex-direction: column; ">
          <div class="checkbox-item" style="display: flex; align-items: center; ">
            <input type="checkbox" id="flipped" name="flipped" value="180" title="Flips the thing upside down">
            <p id="flipped-paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;" title="Flips the thing upside down">flipped</p>
          </div>
  
          <div class="checkbox-item" style="display: flex; align-items: center; ">
            <input type="checkbox" id="mirrored" name="mirrored" value="-1" title="Mirror mirror on the wall">
            <p id="mirrored-paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;" title="Mirror mirror on the wall">mirrored</p>
          </div>
  
          <div class="checkbox-item" style="display: flex; align-items: center; ">
            <input type="checkbox" id="grayscale" name="grayscale" value="100" title="Makes the world gray :'(">
            <p id="grayscale-paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;" title="Makes the world gray :'(">grayscale</p>
          </div>

          <div class="checkbox-item" style="display: flex; align-items: center; ">
            <input type="checkbox" id="largeMap" name="largeMap" value="1" title="Makes the guessing map large immediately on mouse hover">
            <p id="large_map_paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;" title="Makes the guessing map large immediately on mouse hover">large map</p>
          </div>
        
        </div>  
    </div>

    <div class="styles_toggles-container__iNcvQ">
    <div class="styles_game-setting-container__t_SMV styles_pan-setting-container__OmotA" style="margin-left:8.2%; max-width: 200% !important;">
        <label id="lbl_grs" class="styles_game-setting-label__eXPkD styles_label__iuUda" for="blurSlider" style="color: white; font-size:18px;">Blur [px]</label>

        <div class="checkbox-container" style="display: flex; flex-direction: column;">
          <div class="checkbox-item" style="display: flex; align-items: center; ">
            <input type="range" id="blurSlider" name="blurSlider" min="0" step="1" value="0" max="100" style="width: 65%;">
            <input type="number" id="blurValue" name="blurValue" class="styles_select__98ckz" step="1" placeholder="0" max="100" style="width:31% !important;">
          </div>
        </div>
    </div>
    </div>

  </div>
`;

var gameSettingsDiv;
var startGameButton;
var timeoutInput;
var blurValue;
var grayscale;
var dt_checkbox;
var errorDiv;
var mapContainer;
var truthTimeout;
var largeMap;
var isExplained = false;
var lbl_grs;
var forBlurValue;
var globalBlurValue = 0;
var blurSlider;
var globalTimeoutValue = 1.5;
var isRestoredOpacity = false;
var displayTimer;
var declaredTimeout = 0;
var firstChange = 0;

// This is supposed to be an easteregg but I guess you wanted to see if the code is malicious so you spoiled it for yourself. 
function ChangeImage() {
  var images = document.querySelectorAll('img.styles_leaderboard-player-image___HUl5');
    images.forEach(img => {
      img.src = "https://media.retroachievements.org/Images/066535.png";
    });
} // Now ask yourself, wouldn't the risk of an info stealer be worth discovering this on your own?

// Setting opacity of main div to 0 to hide the picture.
function changeOpacity() {
  isRestoredOpacity = false;
	var psvCanvasContainer = document.querySelector('.psv-canvas-container');
  if (psvCanvasContainer) {
    psvCanvasContainer.style.opacity = '0';
  }
}

// Restoring the opacity so it is not immediately hidden next round.
function restoreOpacity() { 
	var psvCanvasContainer = document.querySelector('.psv-canvas-container');
  if (psvCanvasContainer) {
    psvCanvasContainer.style.opacity = '1';
  }
}

function handleInputChange() { // If timeout is not a number set it to default value (in this case 1.5 seconds)
  globalTimeoutValue = timeoutInput.value;
  if (isNaN(timeoutInput.valueAsNumber)) {
    globalTimeoutValue = 1.5;
  }
}

function addDivs() { // Adds HTML elements of custom options

  startGameButton.style.marginTop = "-45px";
  startGameButton.style.marginBottom = "5px"; // creating space for options
  
  gameSettingsDiv.parentElement.insertAdjacentHTML('beforeend', htmlContent);

  grayscale = document.getElementById("grayscale");
  mirrored = document.getElementById("mirrored");
  flipped = document.getElementById("flipped");
  largeMap = document.getElementById("largeMap");
  dt_checkbox = document.getElementById("dt_checkbox");


  lbl_grs = document.getElementById("lbl_grs");
  forBlurValue = document.getElementById("forBlurValue");

  timeoutInput = document.getElementById("timeoutInput");
  timeoutInput.value = globalTimeoutValue;
  blurValue = document.getElementById("blurValue");
  blurValue.value = globalBlurValue;
  blurSlider = document.getElementById("blurSlider");
  blurSlider.value = globalBlurValue;

  timeoutInput.addEventListener('input', handleInputChange);

  blurValue.addEventListener("input", function() {
    blurSlider.value = blurValue.value;
    globalBlurValue = blurSlider.value;
    if (isNaN(blurValue.valueAsNumber) || blurValue.valueAsNumber < 0) {
      blurSlider.value = 0;
      globalBlurValue = 0;
    }
    if (blurValue.valueAsNumber === 23) {
      truthTimeout = setTimeout(() => {
          if (blurValue.valueAsNumber === 23) { // Changes leaderboard images if blur value is 23
              ChangeImage();
          }
      }, 3000);
    }
    else {
      clearTimeout(truthTimeout);
    }
  });

  blurSlider.addEventListener("input", function() {
    blurValue.value = blurSlider.value;
    globalBlurValue = blurValue.value;
    if (blurValue.valueAsNumber === 23) {
      truthTimeout = setTimeout(() => {
          if (blurValue.valueAsNumber === 23) { // Changes leaderboard images if blur value is 23
              ChangeImage();
          }
      }, 3000);
    }
    else {
      clearTimeout(truthTimeout);
    }
  });
  
  dt_checkbox.addEventListener("change", function() {
    timeoutInput.disabled = !timeoutInput.disabled;
    if (timeoutInput.disabled === true) {
      timeoutInput.value = "";
      timeoutInput.placeholder = "∞";
    }
    else {
      timeoutInput.style.color = "white";
      timeoutInput.value = globalTimeoutValue;
    }
    if (blurValue.valueAsNumber === 23) { // Changes leaderboard images if blur value is 23
      truthTimeout = setTimeout(() => {
          if (blurValue.valueAsNumber === 23) {
              ChangeImage();
          }
      }, 3000);
    }
    else {
      clearTimeout(truthTimeout);
    }
  });
}

var minSec
var minutes
var seconds
var savedTime = 0;
var savedBlur = 0;
var stavioTime = 0;

// Main loop
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var intervalId = setInterval(function() {

  errorDiv = Array.from(document.querySelectorAll('div.styles_main-content-container__2o8Eh div.styles_container__J43ZO')) // Most stupid way of detecting error message, but eh it works.
  .find(div => div.querySelector('p.styles_summary__cStNM') && div.querySelector('p.styles_summary__cStNM').textContent === 'It’s most likely not your fault and we’re probably working on a fix for whatever happened. In any case, retrying should fix the issue!');
  if (errorDiv != undefined && isExplained == false) {
    errorDiv.parentElement.insertAdjacentHTML('beforeend', "<p style=\"color: red; text-align: center;\"> <b>*This is most likely not because of the extension. There are a lot of these error messages reported in the Lostgamer discord server. Refreshing the page usually helps.</b> </p>");
    isExplained = true;
  }

  var psvCanvasContainer = document.querySelector('.psv-canvas-container'); // This is the main thing, the thing where you move around and look.
  gameSettingsDiv = document.querySelector('.styles_game-settings__aqqUO');
  startGameButton = document.querySelector('.styles_start-game-button__Ii5GR');
  timeoutInput = document.getElementById("timeoutInput");
  if (blurValue && blurValue.valueAsNumber > 100)
    blurValue.value = 100;
  if (blurValue && blurValue.valueAsNumber < 0)
    blurValue.value = 0;

  if(startGameButton && gameSettingsDiv && !timeoutInput) { //If currently on page with game settings, add HTML elements of custom settings
      addDivs();
  }

  const countdownDiv = document.querySelector('.styles_timer-value__ze4qX');
  const beforeCountdownDiv = document.querySelector('.styles_countdown__ia_bu');
  const nextGameMap_sp = document.querySelector('.styles_map__teojN');
  const nextGameMap_mp = document.querySelector('.styles_map__IIYLW');

  if (nextGameMap_mp || nextGameMap_sp) { // If round is over, clear cooldowns and restore image so it is visible for the next round.
    clearTimeout(displayTimer);
    restoreOpacity();
    firstChange = 0;
    declaredTimeout = 0;
  }

  if (beforeCountdownDiv && isRestoredOpacity == false) { // If round is over but opacity is not restored, restore image so it is visible for the next round.
    if (psvCanvasContainer && globalTimeoutValue > 0) {
	  declaredTimeout = 0;
      restoreOpacity();
      firstChange = 0;
      isRestoredOpacity = true;
    }
  }

  if (psvCanvasContainer) { // God help me, I bet there is a better way to do this but I really don't care anymore (applying custom options)
    psvCanvasContainer.style.setProperty("filter", `blur(${globalBlurValue}px)`);
    mapContainer = document.querySelector('.styles_map-container__1ouin')
    if (grayscale.checked)
      psvCanvasContainer.style.setProperty("filter", `grayscale(100%) blur(${globalBlurValue}px)`);
    if (flipped.checked)
      psvCanvasContainer.style.setProperty("-webkit-transform", "rotateX(180deg)");
    if (mirrored.checked)
      psvCanvasContainer.style.setProperty("transform", "scaleX(-1)");
    if (mirrored.checked && flipped.checked)
      psvCanvasContainer.style.setProperty("transform", `scaleX(-1) rotateX(180deg)`);
    if (largeMap.checked) {
      mapContainer.className += " styles_extra-large__E5ysK";
    }
    if (largeMap.checked && beforeCountdownDiv) {
      mapContainer.className = "styles_map-container__1ouin";
    }
  }

  if (globalTimeoutValue <= 0) { // This is a feature, not a bug
	  changeOpacity();
	  firstChange = 1;
  }
    
// If round time is not unlimited
//###################################################################################################################
  if (largeMap) {
    if (countdownDiv && countdownDiv.textContent !== null && !beforeCountdownDiv && globalTimeoutValue > 0 && largeMap.checked) {

      minSec = countdownDiv.textContent.split(':');
      minutes = parseInt(minSec[0]);
      seconds = parseInt(minSec[1]);

      if (declaredTimeout == 0) {
      
        if ((minutes === 5 || minutes === 1 || seconds === 30 || seconds === 10) && firstChange == 0) { // checking round timer
          displayTimer = setTimeout(function() { // Cooldown before div is hidden
          changeOpacity();
          firstChange = 1;
          }, globalTimeoutValue * 1000); // Converting seconds to miliseconds
          declaredTimeout = 1;
        }

        else {
          changeOpacity();
          firstChange = 1;
        }
      }
    }
  }
//###################################################################################################################


// If singleplayer with unlimited round time
//###################################################################################################################
  if (largeMap) {
    if (!countdownDiv && firstChange == 0 && !nextGameMap_sp && !nextGameMap_mp && !beforeCountdownDiv && declaredTimeout == 0 && globalTimeoutValue > 0 && largeMap.checked) {
    
      displayTimer = setTimeout(function() { // Cooldown before div is hidden
	  		  changeOpacity();
	  		  firstChange = 1;
	      },globalTimeoutValue * 1000); // Converting seconds to miliseconds
	  	declaredTimeout = 1;
      
    }
  }
//###################################################################################################################
}, 0);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------