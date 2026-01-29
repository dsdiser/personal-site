import { useRef, ReactNode } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import type { Vector3 } from "./types";

interface ButtonProps {
    children: ReactNode;
    color?: string;
    onClick?: () => void;
    position?: Vector3;
    rotation?: Vector3;
}

export function Button({ children, color = 'white', onClick, ...props }: ButtonProps) {
    const ref = useRef<THREE.Mesh>(null);

    return (
        <Text
            ref={ref}
            color={color}
            onPointerOver={() => {
                if (ref.current && 'color' in ref.current.material) {
                    (ref.current.material as THREE.MeshBasicMaterial).color.set('orange');
                }
            }}
            onPointerOut={() => {
                if (ref.current && 'color' in ref.current.material) {
                    (ref.current.material as THREE.MeshBasicMaterial).color.set(color);
                }
            }}
            onClick={onClick}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onPointerDown={(e: any) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (e as any).stopPropagation?.();
                onClick?.();
            }}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff"
            anchorY="middle"
            anchorX="center"
            fontSize={0.09}
            {...props}>
            {children}
        </Text>
    );
}