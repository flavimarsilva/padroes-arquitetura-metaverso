const createText = function () {};
const createPanel = async function (scene, data) {
  //Set font type
  var font_type = "Arial";

  //Set width an height for plane
  var planeWidth = 2;
  var planeHeight = 2;

  //Create plane
  var plane = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { width: planeWidth, height: planeHeight },
    scene
  );

  //Set width and height for dynamic texture using same multiplier
  var DTWidth = planeWidth * 500;
  var DTHeight = planeHeight * 500;

  //Set text

  let name = data.nome;
  let age = data.idade;
  let situation = data.situacao;
  //Create dynamic texture
  var dynamicTexture = new BABYLON.DynamicTexture(
    "DynamicTexture",
    { width: DTWidth, height: DTHeight },
    scene
  );

  //Check width of text for given font type at any size of font
  let ctx = dynamicTexture.getContext();
  var size = 2; //any value will work
  ctx.font = size + "px " + font_type;
  var textWidth = ctx.measureText(name).width;

  //Calculate ratio of text width to size of font used
  var ratio = textWidth / size;

  //set font to be actually used to write text on dynamic texture
  var font_size = Math.floor(DTWidth / (ratio * 5)); //size of multiplier (1) can be adjusted, increase for smaller text
  var font = font_size + "px " + font_type;

  //create material
  var mat = new BABYLON.StandardMaterial("mat", scene);
  mat.diffuseTexture = dynamicTexture;

  //apply material
  plane.material = mat;
  plane.position.x = 2;
  plane.rotation.y = Math.PI;
  plane.position.y = 1;
  //Draw text
  dynamicTexture.drawText(
    "Informação",
    DTWidth / 4,
    DTHeight / 10,
    font,
    "#0000ff ",
    "#ffffff",
    true
  );
  dynamicTexture.drawText(
    "Nome:",
    DTWidth / 10,
    DTHeight / 4,
    font,
    "#000000",
    null,
    true
  );
  dynamicTexture.drawText(
    name,
    DTWidth / 2,
    DTHeight / 4,
    font,
    "#000000",
    null,
    true
  );
  dynamicTexture.drawText(
    "Idade:",
    DTWidth / 10,
    DTHeight / 3,
    font,
    "#000000",
    null,
    true
  );
  dynamicTexture.drawText(
    age,
    DTWidth / 2,
    DTHeight / 3,
    font,
    "#000000",
    null,
    true
  );
  dynamicTexture.drawText(
    "Situação:",
    DTWidth / 10,
    DTHeight / 2,
    font,
    "#000000",
    null,
    true
  );
  dynamicTexture.drawText(
    situation,
    DTWidth / 2,
    DTHeight / 2,
    font,
    "#000000",
    null,
    true
  );
};
const createAvatar = async function (scene, camera) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "https://assets.babylonjs.com/meshes/",
    "HVGirl.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const hero = newMeshes[0];

      //Scale the model down
      hero.scaling.scaleInPlace(0.1);

      //Lock camera on the character
      camera.target = hero;
    }
  );
};
const createScene = async function (engine, data) {
  console.log(data);
  const scale = 0.02;
  const scene = new BABYLON.Scene(engine);

  const alpha = Math.PI / 2;
  const beta = Math.PI / 2;
  const radius = 220 * scale;
  const target = new BABYLON.Vector3(0, 1, 0);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    alpha,
    beta,
    radius,
    target,
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.6;
  await createAvatar(scene, camera);

  await createPanel(scene, data);
  const xrHelper = await scene.createDefaultXRExperienceAsync();

  const featuresManager = xrHelper.baseExperience.featuresManager;

  featuresManager.enableFeature(
    BABYLON.WebXRFeatureName.POINTER_SELECTION,
    "stable",
    {
      xrInput: xrHelper.input,
      enablePointerSelectionOnAllControllers: true,
    }
  );
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 400,
    height: 400,
  });

  featuresManager.enableFeature(
    BABYLON.WebXRFeatureName.TELEPORTATION,
    "stable",
    {
      xrInput: xrHelper.input,
      floorMeshes: [ground],
      snapPositions: [new BABYLON.Vector3(2.4 * 3.5 * scale, 0, -10 * scale)],
    }
  );
  return scene;
};
