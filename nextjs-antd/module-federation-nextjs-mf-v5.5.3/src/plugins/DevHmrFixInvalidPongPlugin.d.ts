import { Compiler } from 'webpack';
/**
 * If HMR through websocket received {"invalid":true, "event":"pong"} event
 *   then pages reloads. But for federated page this is unwanted behavior.
 *
 * So this plugin in DEV mode disables page.reload() in HMR for federated pages.
 */
export declare class DevHmrFixInvalidPongPlugin {
    apply(compiler: Compiler): void;
}
export default DevHmrFixInvalidPongPlugin;
