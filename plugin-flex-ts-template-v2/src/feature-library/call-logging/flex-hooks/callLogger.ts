import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from '@twilio/flex-plugin';
export default class CallLoggingPlugin extends FlexPlugin {
     constructor() {
    super('CallLoggingPlugin');
  }

  async init (flex:any,manager:any){
    console.log("custom plugin initialised");
    flex.Actions.addListener('afterAcceptTask',(payload:any)=>{
console.log("afterAcceptTask event triggered "+JSON.stringify(payload,null,2))
    })
      flex.Actions.addListener('afterCompleteTask',(payload:any)=>{
console.log("afterCompleteTask event triggered "+JSON.stringify(payload,null,2))
    })
  }
}

