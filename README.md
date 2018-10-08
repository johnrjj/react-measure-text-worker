# 📐 react-measure-text-worker 🔨


An experimental React component that performs expensive text measurements off the main thread and return results to the component's children.

[Demo](https://measure-text-off-thread.surge.sh/)

## Background

### Problem

Require ability to dynamically measure text for width, height, and other style attributes off-thread without interacting with DOM.

### Concepts

Three main concepts:

1. WebWorker work is done off the main UI thread.
2. With the introduction of [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) in Chrome 69, we can now perform Canvas work in a WebWorker. 
3. Inside a Canvas, you can do some powerful calculations on styles and positioning. 

Let's combine these three concepts in the context of an application that does significant DOM or Canvas measuring. We can move these expensive calculations off the main thread by performing the same calculations inside a Canvas on a separate thread via a WebWorker. This will allow the main thread (UI thread) to free up resources, and allow the main thread to run smoothly and maintain a desired 60fps.

More details on OffscreenCanvas with WebWorkers can be found [here](https://developers.google.com/web/updates/2018/08/offscreen-canvas)



### Solution - Declarative Approach

#### ```</MeasureTextWorker>```

A React component that is able to handle expensive measurments of text attributes off-thread in a WebWorker, which then returns the requested measurements to the main thread for rendering via children components: 



## Getting Started

Clone the repo, install the dependencies, and run the dev environment. That's it!

```js
git clone https://github.com/johnrjj/react-measure-text-worker.git
yarn install
yarn start
```

Navigate to [localhost:1234](localhost:1234) to see the app running

## API


`MeasureTextWorker` renders a "child as a function" component which provides a textData object to the children, which the children can then use to render however they would like.

```jsx
import { MeasureTextWorker } from 'react-measure-text-worker';

const text = 'measure this text';

// inside render...
<MeasureTextWorker
  text={text}
  fontSize={20}
  fontFamily={'Arial'}
>
{textData => (
  <span>
    <div style={{ width: textData.width, height: textdata.height }}>
    	Do overlay here
    </div>
    <span>{text}</span>
  </span>
)}
</MeasureTextWorker>
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
	│  </MeasureTextWorker>   │◀────────┐             │                 │                    ▼               
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
	│        children         │                                                                              
	│                         │                 │                                                            
	└─────────────────────────┘                                                                              




## Performance

🔥 It's really fast.
