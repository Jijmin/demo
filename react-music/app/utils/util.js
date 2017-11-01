/**
 * Created by v_yinggzhou on 2017/11/1.
 */
export function randomRange(under, over) {
    return Math.ceil(Math.random() * (over - under) + under);
}