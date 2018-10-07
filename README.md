# MeasureTextOffThread
## Overview

### TL;DR

An experimental React component that does expensive text measurements off the main thread and return results to the component's children.

[Demo](https://measure-text-off-thread.surge.sh/)

### Context

Three main ideas:

1. WebWorker work is done off the main UI thread.
2. With the introduction of [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) in Chrome 69, we can now perform Canvas work in a WebWorker. 
3. Inside a Canvas, you can do some powerful calculations on styles and positioning. 

Let's combine these three ideas in the context of an application that does significant DOM or Canvas measuring. We can move the expensive calculations off the main thread by performing the same calculations inside a Canvas on a separate thread. This will allow the main thread (read: UI thread) to free up resources, and allow the main thread to run smoothly and maintain the required 60fps.

More details on OffscreenCanvas with WebWorkers can be found [here](https://developers.google.com/web/updates/2018/08/offscreen-canvas)

### Problem 

Ability to dynamically measure text for width, height, and other style attributes off-thread without interacting with DOM.

### Solution - Declarative Approach


We built a declarative React UI component that is able to handle expensive measurments of text attributes off-thread in an asynchronusly and non-blocking, which then returns the requested measurements to the main thread for rendering via children components: ```</MeasureTextOffThread>```


## Usage


`MeasureTextOffThread` renders as a "child as a function" component which provides a textData object to the children, which the children can then use to render however they would like.

```jsx
const text = 'measure this text';

<MeasureTextOffThread
  text={text}
  fontSize={20}
  fontFamily={'Times'}
>
{textData => (
  <span>
    <div style={{ width: textData.width, height: textdata.height }}>
    	Do overlay here
    </div>
    <span>{text}</span>
  </span>
)}
</MeasureTextOffThread>
```




## Architecture

	       ┌───────────┐                                                                                     
	       │           │                                                                                     
	       │    App    │                     thread                                                          
	       │           │                    boundary                                                         
	       └───────────┘                                                                                     
	             │                              │                                                            
	             │                                                                                           
	             │                              │                                                            
	             │                postMessage         ┌─────────────────┐                                    
	             ▼                request to    │     │                 │                                    
	┌─────────────────────────┐    webworker          │    WebWorker    │                                    
	│                         │─────────────────┼────▶│    onmessage    │────────────────────┐               
	│ </MeasureTextOffThread> │◀────────┐             │                 │                    ▼               
	│                         │         │       │     └─────────────────┘          ┌──────────────────┬─────┐
	└─────────────────────────┘         │                                          │                  │     │
	             │                      │       │                                  │ Worker processes │ LRU │
	             │                      │                                          │      request     │cache│
	             │                      │       │  ┌───────────────────────────┐   │                  │     │
	    ({ width, height })             │          │                           │   └──────────────────┴─────┘
	             │                      │       │  │ postMessage Response Bus  │             │               
	             │                      └─────────◀│         (shared)          │◀────────────┘               
	             ▼                              │  │                           │       send response         
	┌─────────────────────────┐                    └───────────────────────────┘      payload to bus         
	│                         │                 │                                                            
	│          span           │                                                                              
	│                         │                 │                                                            
	└─────────────────────────┘                                                                              
