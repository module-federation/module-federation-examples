import { ClientOptions, RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';
import { RouteConfig } from 'vue-router';
export declare function createApp(routes: RouteConfig[]): (context: RenderContext | ClientOptions) => Promise<import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>>>;
