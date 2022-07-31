import {frontendMaterials} from "./FrontEnd";
import {minecraftMaterials} from "./Minecraft";
import {pythonMaterials} from "./Python";
import {webDesignMaterials} from "./WebDesign";
import {unityMaterials} from "./Unity";
import {digitalArtMaterials} from "./DigitalArt";
import {unrealEngineMaterials} from "./UnrealEngine";
import {kspMaterials} from "./KerbalSpace";

export const materialCollection = () => [
  frontendMaterials(),
  minecraftMaterials(),
  pythonMaterials(),
  webDesignMaterials(),
  unityMaterials(),
  digitalArtMaterials(),
  unrealEngineMaterials(),
  kspMaterials(),
]