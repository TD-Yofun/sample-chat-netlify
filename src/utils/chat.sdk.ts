export function connect(region: string, environment: string, touchpoint_id: string, context?: Record<string, string>) {
  let webchat: any;
  ((window, document, node, props, configs) => {
    if (window.TalkdeskChatSDK) {
      // remove container
      const container = document.getElementById(node);
      if (container) {
        container.remove();
      }
      // remove script
      const script = document.getElementById('tdwebchatscript');
      if (script) {
        script.remove();
      }
      window.TalkdeskChatSDK = null;
      // eslint-disable-next-line no-console
      console.log('TalkdeskChatSDK removed');
    }
    const divContainer = document.createElement('div');
    divContainer.id = node;
    document.body.appendChild(divContainer);
    // var src = `https://talkdeskchatsdk.svc.talkdeskqa.com/talkdeskchatsdk.js`;
    const script = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.id = 'tdwebchatscript';
    script.src = environment;
    script.async = true;
    firstScriptTag.parentNode!.insertBefore(script, firstScriptTag);
    script.onload = () => {
      webchat = window.TalkdeskChatSDK(node, props);
      webchat.init(configs);
      /*
       * Send custom data from your website to TalkDesk!
       * If you would like to do it, you need to remove the following commented code and
       * modify the webchat.setContextParam parameters to pass in the data you need.
       */
      function setContext() {
        if (context) {
          webchat.setContextParam({ ...context });
        }
      }
      // Send data when the chat conversation is initiated
      webchat.onConversationStart = function () {
        setContext();
      };
      // Send data when the chat widget is open
      webchat.onOpenWebchat = function () {
        setContext();
      };
    };
  })(
    window,
    document,
    'tdWebchat',
    {
      touchpointId: touchpoint_id,
      accountId: '',
      region,
    },
    { enableEmoji: true, enableUserInput: true, enableAttachments: true, enableConnectionFromTriggerButton: true },
  );
}
