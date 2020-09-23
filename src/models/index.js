/**
 * @module       models/index
 * @description  Entry point to the models module.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import Model from "./model";
export { default as fields } from "./fields";
export { default as ModelAPI } from './api'
export { default as ApiFilter } from './apiFilter'

export default Model;
