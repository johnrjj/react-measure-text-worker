perf tests http://jsben.ch/2xacl


### Architecture

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
