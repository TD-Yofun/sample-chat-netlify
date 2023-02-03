// @ts-nocheck

export function connect(src: string, flow_id: string) {
  let webchat;
  ((window, document, node, props, configs) => {
    if (window.TalkdeskChatSDK) {
      console.error("TalkdeskChatSDK already included");
      return;
    }
    const divContainer = document.createElement("div");
    divContainer.id = node;
    document.body.appendChild(divContainer);
    const script = document.createElement("script");
    const firstScriptTag = document.getElementsByTagName("script")[0];
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.id = "tdwebchatscript";
    script.src = src;
    script.async = true;
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    script.onload = () => {
      webchat = TalkdeskChatSDK(node, props);
      webchat.init(configs);
      /*
       * Send custom data from your website to TalkDesk!
       * If you would like to do it, you need to remove the following commented code and
       * modify the webchat.setContextParam parameters to pass in the data you need.
       */
      /*function setContext() {
             webchat.setContextParam({ "var1": "value1", "var2": "value2", "var3": 100 })
           }
           // Send data when the chat conversation is initiated
           webchat.onConversationStart = function() {
             setContext()
           }
           // Send data when the chat widget is open
           webchat.onOpenWebchat = function() {
             setContext()
           }*/
    };
  })(
    window,
    document,
    "tdWebchat",
    {
      flowId: flow_id,
      accountId: "",
      region: "td-us-1",
    },
    { enableEmoji: true, enableUserInput: true }
  );
}
