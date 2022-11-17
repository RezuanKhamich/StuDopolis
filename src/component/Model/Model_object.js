import React, { useRef } from "react";
import {useGLTF} from "@react-three/drei";

export default function Model_object(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Wolf-Blender-2.82a.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={0.4}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room}
        // material={materials["Material.001"]}
      />
      {/*<mesh*/}
      {/*  castShadow*/}
      {/*  receiveShadow*/}
      {/*  geometry={nodes.Curve007_2.geometry}*/}
      {/*  material={materials["Material.002"]}*/}
      {/*/>*/}
    </group>
  );
}

useGLTF.preload("/Wolf-Blender-2.82a.gltf");
