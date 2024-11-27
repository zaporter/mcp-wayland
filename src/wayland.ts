import open_display from "wayland-client";
import { Wl_compositor, Wl_display } from "./protocol/wayland.js";
import { Zwlr_foreign_toplevel_manager_v1 } from "./protocol/wlr-foreign-toplevel-management-unstable-v1.js";

async function listWindows() {
    const display = await open_display();
    await display.load('/home/zack/personal/mcp-wayland/src/protocol/wlr-foreign-toplevel-management-unstable-v1.xml');
    const compositor = await display.bind<Zwlr_foreign_toplevel_manager_v1>("zwlr_foreign_toplevel_manager_v1");

    // Get the registry to access global objects

    console.log("started");


    if (!compositor) {
        console.error('No compositor found');
        return;
    }

    const titles: string[] = [];
    compositor.on('toplevel', (listener) => {
        console.log(listener);
        listener.on('state', (state)=> {
            console.log('state', state)
        }) 
    });
    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Get all surfaces
    await compositor.stop();
    console.log("stopped");
}

// Run the function
listWindows().catch(console.error);
