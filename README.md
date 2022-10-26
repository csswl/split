# split
HTML5 bootstrap Page Split plugin

This tool is use in html page when need page split.
The split can be vertical or horizontal and can be nested.
User can drag the spliter and move left/right (vertical split) or top/bottom (horizontal) to determin the corresponding 
part width or height.

The spliter width / height has default value, user can set it with css or inline style, the plugin will not change it.

User need to set the left part width (vertical split) or the top part height (horizontal split) with unit px or percent.

The split fires events with init-success.bs.split, init-error.bs,split, split-start.bs.split, split-done.bs.split correspondingly.

The example is coming from real project and may not run on your system, the perpose is to show how to config your own html

the reason in code devicePixelRadio / 1.25:
the const 1.25 is the window display scaling setting, my display use 125% scaling, that is it.

Now this constant is calculated automatically.

Issues:

I found if the page running on local (window10) without web server, when the dragger is in iframe range, offen you can not move it.
if you move the cursor to the split (any one) or the scroll bar (all these elements are belongs to the main page), you can move the dragger.

If it is running under web server, it is no problem.


