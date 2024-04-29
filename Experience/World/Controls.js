import * as THREE from 'three';
import Experience from "../Experience.js";
import GSAP from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";


export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });


        GSAP.registerPlugin(ScrollTrigger);
        
        this.setScrollTrigger();
    }

    setScrollTrigger(){
        GSAP.matchMedia().add("(min-width: 969px)", () => {
            // Code for desktop devices
            console.log("Desktop");

            // First section -----------------------------------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.8,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });
            this.firstMoveTimeline.fromTo(
                this.room.position,
                { x: 0, y: 0, z: 0 },
                {
                    x: () => {
                        return this.sizes.width * 0.00125;
                    },
                }
            );
            // Second section -----------------------------------------
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            })
                .to(
                    this.room.position,
                    {
                        x: () => {
                            return 1;
                        },
                        z: () => {
                            return this.sizes.height * 0.0032;
                        },
                    },
                    "same"
                )
                .to(
                    this.room.scale,
                    {
                        x: 0.4,
                        y: 0.4,
                        z: 0.4,
                    },
                    "same"
                )
                .to(
                    this.rectLight,
                    {
                        width: 0.5 * 4,
                        height: 0.7 * 4,
                    },
                    "same"
                );
        });
       
        GSAP.matchMedia().add("(max-width: 968px)", () => {
            // Code for mobile devices
            console.log("Mobile");

            
        });
    
        GSAP.matchMedia().add("all", () => {
            // Code for both mobile and desktop devices
            console.log("Mobile & Desktop");

            
        });
    }

    resize(){
    }

    update(){
    }
}