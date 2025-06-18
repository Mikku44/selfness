import { PassThrough } from "node:stream";
import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot"; // Import isbot
import { renderToPipeableStream, renderToString } from "react-dom/server"; // Also import renderToString if you plan to use it for bots

// Optional: Create a React Context to expose the `isBot` status to your components
// app/is-bot.context.tsx
// import type { ReactNode } from "react";
// import { createContext, useContext } from "react";
//
// type IsBotContextType = {
//   isBot: boolean;
// };
//
// const IsBotContext = createContext<IsBotContextType | undefined>(undefined);
//
// export function IsBotProvider({ isBot, children }: { isBot: boolean; children: ReactNode }) {
//   return (
//     <IsBotContext.Provider value={{ isBot }}>
//       {children}
//     </IsBotContext.Provider>
//   );
// }
//
// export function useIsBot() {
//   const context = useContext(IsBotContext);
//   if (context === undefined) {
//     throw new Error("useIsBot must be used within an IsBotProvider");
//   }
//   return context.isBot;
// }


const ABORT_DELAY = 5000; // Define an abort delay for streaming

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  const userAgent = request.headers.get("User-Agent");
  const isBotRequest = userAgent ? isbot(userAgent) : false; // Check if it's a bot

  // You can conditionally handle based on isBotRequest
  if (isBotRequest) {
    // For bots, you might want to render to a string directly (no streaming)
    // and potentially strip out <Scripts> or other JS-dependent elements
    try {
      let markup = renderToString(
        // Wrap your App in a provider if you created one
        // <IsBotProvider isBot={isBotRequest}>
          <RemixServer context={remixContext} url={request.url} />
        // </IsBotProvider>
      );

      // You could further modify `markup` here to remove script tags if desired.
      // However, the best practice is to conditionally render <Scripts> in your `root.tsx`
      // based on the context value.

      responseHeaders.set("Content-Type", "text/html");
      return new Response("<!DOCTYPE html>" + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error("Error rendering for bot:", error);
      // Fallback to streaming or a simple error response
      return new Response("Error rendering page.", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } else {
    // For regular browsers, use streaming for better perceived performance
    return new Promise((resolve, reject) => {
      let didError = false;

      const { pipe, abort } = renderToPipeableStream(
        // Wrap your App in a provider if you created one
        // <IsBotProvider isBot={isBotRequest}>
          <RemixServer context={remixContext} url={request.url} />
        // </IsBotProvider>
        ,
        {
          onShellReady() {
            const body = new PassThrough();
            responseHeaders.set("Content-Type", "text/html");

            resolve(
              new Response(createReadableStreamFromReadable(body), {
                headers: responseHeaders,
                status: didError ? 500 : responseStatusCode,
              })
            );
            pipe(body);
          },
          onShellError(error: unknown) {
            reject(error);
          },
          onError(error: unknown) {
            didError = true;
            console.error(error);
          },
        }
      );

      setTimeout(abort, ABORT_DELAY);
    });
  }
}

function createReadableStreamFromReadable(readable: PassThrough) {
  return new ReadableStream({
    start(controller) {
      readable.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      readable.on("end", () => {
        controller.close();
      });
      readable.on("error", (error) => {
        controller.error(error);
      });
    },
  });
}