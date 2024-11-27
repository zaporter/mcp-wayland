import { Wl_interface } from "wayland-client";
import {
    wl_new_id,
    wl_uint,
    wl_int,
    wl_fixed,
    wl_string,
    wl_fd,
  } from "wayland-client";

/**
 * @summary list and control opened apps
 * 
 *  The purpose of this protocol is to enable the creation of taskbars
 *  and docks by providing them with a list of opened applications and
 *  letting them request certain actions on them, like maximizing, etc.
 * 
 *  After a client binds the zwlr_foreign_toplevel_manager_v1, each opened
 *  toplevel window will be sent via the toplevel event
 *  
 */
export interface Zwlr_foreign_toplevel_manager_v1 extends Wl_interface{
  name: "zwlr_foreign_toplevel_manager_v1";
  version: 3;
  enums:{
        
  }
  
    
  /**
   * @summary a toplevel has been created
   * 
   *  This event is emitted whenever a new toplevel window is created. It
   *  is emitted for all toplevels, regardless of the app that has created
   *  them.
   * 
   *  All initial details of the toplevel(title, app_id, states, etc.) will
   *  be sent immediately after this event via the corresponding events in
   *  zwlr_foreign_toplevel_handle_v1.
   *  
   */
  on(eventName: "toplevel", listener: (toplevel: Zwlr_foreign_toplevel_handle_v1)=>void): this;
  
  
  /**
   * @summary the compositor has finished with the toplevel manager
   * 
   *  This event indicates that the compositor is done sending events to the
   *  zwlr_foreign_toplevel_manager_v1. The server will destroy the object
   *  immediately after sending this request, so it will become invalid and
   *  the client should free any resources associated with it.
   *  
   */
  on(eventName: "finished", listener: ()=>void): this;
  
    
  /**
   * @summary stop sending events
   * 
   *  Indicates the client no longer wishes to receive events for new toplevels.
   *  However the compositor may emit further toplevel_created events, until
   *  the finished event is emitted.
   * 
   *  The client must not send any more requests after this one.
   *  
   * 
   */
  stop () :Promise<void>;
  
  
}


/**
 * @summary an opened toplevel
 * 
 *  A zwlr_foreign_toplevel_handle_v1 object represents an opened toplevel
 *  window. Each app may have multiple opened toplevels.
 * 
 *  Each toplevel has a list of outputs it is visible on, conveyed to the
 *  client with the output_enter and output_leave events.
 *  
 */
export interface Zwlr_foreign_toplevel_handle_v1 extends Wl_interface{
  name: "zwlr_foreign_toplevel_handle_v1";
  version: 3;
  enums:{
        
    state: [
      
      /**
       * @summary the toplevel is maximized
       */
      {
        name: "maximized",
        value: 0,
        summary: "the toplevel is maximized",
      },
    
    
      /**
       * @summary the toplevel is minimized
       */
      {
        name: "minimized",
        value: 1,
        summary: "the toplevel is minimized",
      },
    
    
      /**
       * @summary the toplevel is active
       */
      {
        name: "activated",
        value: 2,
        summary: "the toplevel is active",
      },
    
    
      /**
       * @summary the toplevel is fullscreen
       */
      {
        name: "fullscreen",
        value: 3,
        summary: "the toplevel is fullscreen",
      },
    
    ]
    ,
    
    error: [
      
      /**
       * @summary the provided rectangle is invalid
       */
      {
        name: "invalid_rectangle",
        value: 0,
        summary: "the provided rectangle is invalid",
      },
    
    ]
    
  }
  
    
  /**
   * @summary title change
   * 
   *  This event is emitted whenever the title of the toplevel changes.
   *  
   */
  on(eventName: "title", listener: (title: wl_string)=>void): this;
  
  
  /**
   * @summary app-id change
   * 
   *  This event is emitted whenever the app-id of the toplevel changes.
   *  
   */
  on(eventName: "app_id", listener: (app_id: wl_string)=>void): this;
  
  
  /**
   * @summary toplevel entered an output
   * 
   *  This event is emitted whenever the toplevel becomes visible on
   *  the given output. A toplevel may be visible on multiple outputs.
   *  
   */
  on(eventName: "output_enter", listener: (output: wl_object)=>void): this;
  
  
  /**
   * @summary toplevel left an output
   * 
   *  This event is emitted whenever the toplevel stops being visible on
   *  the given output. It is guaranteed that an entered-output event
   *  with the same output has been emitted before this event.
   *  
   */
  on(eventName: "output_leave", listener: (output: wl_object)=>void): this;
  
  
  /**
   * @summary the toplevel state changed
   * 
   *  This event is emitted immediately after the zlw_foreign_toplevel_handle_v1
   *  is created and each time the toplevel state changes, either because of a
   *  compositor action or because of a request in this protocol.
   *  
   */
  on(eventName: "state", listener: (state: wl_array)=>void): this;
  
  
  /**
   * @summary all information about the toplevel has been sent
   * 
   *  This event is sent after all changes in the toplevel state have been
   *  sent.
   * 
   *  This allows changes to the zwlr_foreign_toplevel_handle_v1 properties
   *  to be seen as atomic, even if they happen via multiple events.
   *  
   */
  on(eventName: "done", listener: ()=>void): this;
  
  
  /**
   * @summary this toplevel has been destroyed
   * 
   *  This event means the toplevel has been destroyed. It is guaranteed there
   *  won't be any more events for this zwlr_foreign_toplevel_handle_v1. The
   *  toplevel itself becomes inert so any requests will be ignored except the
   *  destroy request.
   *  
   */
  on(eventName: "closed", listener: ()=>void): this;
  
  
  /**
   * @summary parent change
   * 
   *  This event is emitted whenever the parent of the toplevel changes.
   * 
   *  No event is emitted when the parent handle is destroyed by the client.
   *  
   */
  on(eventName: "parent", listener: (parent: wl_object)=>void): this;
  
    
  /**
   * @summary requests that the toplevel be maximized
   * 
   *  Requests that the toplevel be maximized. If the maximized state actually
   *  changes, this will be indicated by the state event.
   *  
   * 
   */
  set_maximized () :Promise<void>;
  
  
  
  /**
   * @summary requests that the toplevel be unmaximized
   * 
   *  Requests that the toplevel be unmaximized. If the maximized state actually
   *  changes, this will be indicated by the state event.
   *  
   * 
   */
  unset_maximized () :Promise<void>;
  
  
  
  /**
   * @summary requests that the toplevel be minimized
   * 
   *  Requests that the toplevel be minimized. If the minimized state actually
   *  changes, this will be indicated by the state event.
   *  
   * 
   */
  set_minimized () :Promise<void>;
  
  
  
  /**
   * @summary requests that the toplevel be unminimized
   * 
   *  Requests that the toplevel be unminimized. If the minimized state actually
   *  changes, this will be indicated by the state event.
   *  
   * 
   */
  unset_minimized () :Promise<void>;
  
  
  
  /**
   * @summary activate the toplevel
   * 
   *  Request that this toplevel be activated on the given seat.
   *  There is no guarantee the toplevel will be actually activated.
   *  
   * @param seat undefined
   */
  activate (seat: wl_object) :Promise<void>;
  
  
  
  /**
   * @summary request that the toplevel be closed
   * 
   *  Send a request to the toplevel to close itself. The compositor would
   *  typically use a shell-specific method to carry out this request, for
   *  example by sending the xdg_toplevel.close event. However, this gives
   *  no guarantees the toplevel will actually be destroyed. If and when
   *  this happens, the zwlr_foreign_toplevel_handle_v1.closed event will
   *  be emitted.
   *  
   * 
   */
  close () :Promise<void>;
  
  
  
  /**
   * @summary the rectangle which represents the toplevel
   * 
   *  The rectangle of the surface specified in this request corresponds to
   *  the place where the app using this protocol represents the given toplevel.
   *  It can be used by the compositor as a hint for some operations, e.g
   *  minimizing. The client is however not required to set this, in which
   *  case the compositor is free to decide some default value.
   * 
   *  If the client specifies more than one rectangle, only the last one is
   *  considered.
   * 
   *  The dimensions are given in surface-local coordinates.
   *  Setting width=height=0 removes the already-set rectangle.
   *  
   * @param surface undefined
   * @param x undefined
   * @param y undefined
   * @param width undefined
   * @param height undefined
   */
  set_rectangle (surface: wl_object, x: wl_int, y: wl_int, width: wl_int, height: wl_int) :Promise<void>;
  
  
  
  /**
   * @summary destroy the zwlr_foreign_toplevel_handle_v1 object
   * 
   *  Destroys the zwlr_foreign_toplevel_handle_v1 object.
   * 
   *  This request should be called either when the client does not want to
   *  use the toplevel anymore or after the closed event to finalize the
   *  destruction of the object.
   *  
   * 
   */
  destroy () :Promise<void>;
  
  
  
  /**
   * @summary request that the toplevel be fullscreened
   * 
   *  Requests that the toplevel be fullscreened on the given output. If the
   *  fullscreen state and/or the outputs the toplevel is visible on actually
   *  change, this will be indicated by the state and output_enter/leave
   *  events.
   * 
   *  The output parameter is only a hint to the compositor. Also, if output
   *  is NULL, the compositor should decide which output the toplevel will be
   *  fullscreened on, if at all.
   *  
   * @param output undefined
   */
  set_fullscreen (output: wl_object) :Promise<void>;
  
  
  
  /**
   * @summary request that the toplevel be unfullscreened
   * 
   *  Requests that the toplevel be unfullscreened. If the fullscreen state
   *  actually changes, this will be indicated by the state event.
   *  
   * 
   */
  unset_fullscreen () :Promise<void>;
  
  
}
