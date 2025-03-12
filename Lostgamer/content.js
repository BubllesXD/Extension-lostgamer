var htmlContent = `
  <div class="styles_game-settings__aqqUO">

    <div class="styles_game-setting-container__t_SMV styles_game-length-setting-container__VLKOn">
      <label for="timeoutInput" class="styles_game-setting-label__eXPkD" style="margin-left: 30%; margin-right: -40%;">Display time</label>
      <input type="number" class="styles_select__98ckz" style="padding-left: 20px; margin-left: 70%" id="timeoutInput" name="timeoutInput" min="0" step="0.1" max="99999999" required>
    </div>

  <div class="styles_game-setting-container__t_SMV styles_game-length-setting-container__VLKOn" style="padding-left: 10%;">
      <label id="lbl_grs" class="styles_game-setting-label__eXPkD styles_label__iuUda" for="opcije" style="color: white; font-size:18px;">Options</label>
      <div class="checkbox-container" style="display: flex; flex-direction: column; gap: 10px;">
  <div class="checkbox-item" style="display: flex; align-items: center; gap: 10px;">
    <input type="checkbox" id="flipped" name="flipped" value="180">
    <p id="flipped-paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;">flipped</p>
  </div>
  
  <div class="checkbox-item" style="display: flex; align-items: center; gap: 10px;">
    <input type="checkbox" id="mirrored" name="mirrored" value="-1">
    <p id="mirrored-paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;">mirrored</p>
  </div>

  <div class="checkbox-item" style="display: flex; align-items: center; gap: 10px;">
    <input type="checkbox" id="grayscale" name="grayscale" value="100">
    <p id="grayscale-paragraph" class="styles_game-setting-label__eXPkD" style="margin: 0; color: white; font-size: 16px;">grayscale</p>
  </div>
</div>
    </div>

    <div class="styles_game-setting-container__t_SMV styles_game-length-setting-container__VLKOn">
        <input type="range" id="blurSlider" name="blurSlider" min="0" step="1" value="0" max="100" style="width: 75%; margin-top: 50px;">
    </div>

    <div class="styles_game-setting-container__t_SMV styles_game-length-setting-container__VLKOn">
      <label class="styles_game-setting-label__eXPkD" style="margin-left: -200%" for="blurValue" id="forBlurValue">Blur percentage</label>
      <input type="number" id="blurValue" name="blurValue" class="styles_select__98ckz" step="1" placeholder="0" max="100" style="width: 40%; margin-right: 90%; !important">
    </div>
  </div>
`;

var gameSettingsDiv;
var startGameButton;
var timeoutInput;
var blurValue;
var grayscale;
var label;

var lbl_grs;
var forBlurValue;
var percentageSymbol;
var secondSymbol;
var grayscaleChecked = 0;
var mirroredCheck = 0;
var flippedCheck = 0;
var globalBlurValue = 0;
var blurSlider;
var styleSheet;
var globalTimeoutValue = 0.5;
var jebotebog = 0;
var betaMessage;
var izbrisoElemente = 0;
var timeoutDobroVrijeme;
var declaredTimeout = 0;
var firstChange = 0;

// Funkcija koja mijenja opacity diva s klasom "psv-canvas-container"
function changeOpacity() {
	var psvCanvasContainer = document.querySelector('.psv-canvas-container');
  if (psvCanvasContainer) {
    psvCanvasContainer.style.opacity = '0';
  }
}

function restoreOpacity() {
	var psvCanvasContainer = document.querySelector('.psv-canvas-container');
  if (psvCanvasContainer) {
    psvCanvasContainer.style.opacity = '1';
  }
}

function handleInputChange() {
  globalTimeoutValue = timeoutInput.value;
  if (isNaN(timeoutInput.valueAsNumber)) {
    globalTimeoutValue = 0.5;
  }
}

function addDivs() {
  startGameButton.style.marginTop = "-45px";
  startGameButton.style.marginBottom = "5px";
  gameSettingsDiv.parentElement.insertAdjacentHTML('beforeend', htmlContent);

  grayscale = document.getElementById("grayscale");
  mirrored = document.getElementById("mirrored");
  flipped = document.getElementById("flipped");


  lbl_grs = document.getElementById("lbl_grs");
  forBlurValue = document.getElementById("forBlurValue");
  percentageSymbol = document.getElementById("percentageSymbol");
  secondSymbol = document.getElementById("secondSymbol");

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
    });

    blurSlider.addEventListener("input", function() {
      blurValue.value = blurSlider.value;
      globalBlurValue = blurValue.value;
    });

    label = document.querySelector('label[for="timeoutInput"]');
    label.style.color = "white";
}

var minSec
var minutes
var seconds
var savedTime = 0;
var savedBlur = 0;
var stavioTime = 0;

// Postavljanje intervala ____________________________________________________________________________________________________________
var intervalId = setInterval(function() {

  var psvCanvasContainer = document.querySelector('.psv-canvas-container');
  gameSettingsDiv = document.querySelector('.styles_game-settings__aqqUO');
  startGameButton = document.querySelector('.styles_start-game-button__Ii5GR');
  timeoutInput = document.getElementById("timeoutInput");
  if (blurValue && blurValue.valueAsNumber > 100)
    blurValue.value = 100;
  if (blurValue && blurValue.valueAsNumber < 0)
    blurValue.value = 0;

  if(startGameButton && gameSettingsDiv && !timeoutInput) {
      addDivs();
  }

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  if (izbrisoElemente == 0 && !startGameButton) {
    if (timeoutInput) {
      gameSettingsDiv.removeChild(label);
      gameSettingsDiv.removeChild(grayscale);
      gameSettingsDiv.removeChild(blurSlider);
      gameSettingsDiv.removeChild(blurValue);
      gameSettingsDiv.removeChild(timeoutInput);
      gameSettingsDiv.removeChild(secondSymbol);
      gameSettingsDiv.removeChild(percentageSymbol);
      gameSettingsDiv.removeChild(forBlurValue);
      gameSettingsDiv.removeChild(lbl_grs);
    }
    izbrisoElemente = 1;
  }
  if (izbrisoElemente == 1 && startGameButton) {
    izbrisoElemente = 0;
  }

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  if (psvCanvasContainer) {
    psvCanvasContainer.style.setProperty("filter", `blur(${globalBlurValue}px)`);
    if (grayscale.checked)
      psvCanvasContainer.style.setProperty("filter", `grayscale(100%) blur(${globalBlurValue}px)`)
    if (flipped.checked)
      psvCanvasContainer.style.setProperty("-webkit-transform", "rotateX(180deg)")
    if (mirrored.checked)
      psvCanvasContainer.style.setProperty("transform", "rotateY(180)")
  }

  const countdownDiv = document.querySelector('.styles_timer-value__ze4qX');
  const beforeCountdownDiv = document.querySelector('.styles_countdown__ia_bu');
  const nextGameMap_sp = document.querySelector('.styles_map__teojN');
  const nextGameMap_mp = document.querySelector('.styles_map__IIYLW');

  if (nextGameMap_mp || nextGameMap_sp) {
    clearTimeout(timeoutDobroVrijeme);
    restoreOpacity();
    firstChange = 0;
    declaredTimeout = 0;
  }

  if (beforeCountdownDiv && jebotebog == 0) {
    if (psvCanvasContainer && globalTimeoutValue > 0) {
	  declaredTimeout = 0;
      restoreOpacity();
      firstChange = 0;
      jebotebog = 1;
    }
  }
  
  if (!beforeCountdownDiv && jebotebog == 1) {
    jebotebog = 0;
  }

  if (globalTimeoutValue <= 0) {
	  changeOpacity();
	  firstChange = 1;
  }
    
//###################################################################################################################
  if (countdownDiv && countdownDiv.textContent !== null && !beforeCountdownDiv && globalTimeoutValue > 0) {

      minSec = countdownDiv.textContent.split(':');
      minutes = parseInt(minSec[0]);
      seconds = parseInt(minSec[1]);

      if (declaredTimeout == 0) {
		// AKO SE RADI O MP IL SP SA VREMENOM ONDA IĐE OVAJ KOD
		
        if ((minutes === 5 || minutes === 1 || seconds === 30 || seconds === 10) && firstChange == 0) {
          restoreOpacity();
          firstChange = 0;

          timeoutDobroVrijeme = setTimeout(function() {
          changeOpacity();
          firstChange = 1;
          }, globalTimeoutValue * 1000);
          declaredTimeout = 1;
        }
        else {
          changeOpacity();
          firstChange = 1;
        }
		
      }
    }
//###################################################################################################################

    // AKO SE RADI O SINGLEPLAYER KAD JE DEFINIRANO UNLIMITED TIME ONDA IĐE OVO
  //###################################################################################################################
  if (!countdownDiv && firstChange == 0 && !nextGameMap_sp && !nextGameMap_mp && !beforeCountdownDiv && declaredTimeout == 0 && globalTimeoutValue > 0) {

    timeoutDobroVrijeme = setTimeout(function() {
			  changeOpacity();
			  firstChange = 1;
	    },globalTimeoutValue * 1000);
		declaredTimeout = 1;
	
  }
		//###################################################################################################################
}, 0);