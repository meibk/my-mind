MM.Action = function() {}
MM.Action.prototype.perform = function() {}
MM.Action.prototype.undo = function() {}

MM.Action.SetText = function(item, text) {
	this._item = item;
	this._text = text;
	this._oldText = item.getText();
}
MM.Action.SetText.prototype = Object.create(MM.Action.prototype);
MM.Action.SetText.prototype.perform = function() {
	this._item.setText(this._text);
}
MM.Action.SetText.prototype.undo = function() {
	this._item.setText(this._oldText);
}

MM.Action.SetValue = function(item, value) {
	this._item = item;
	this._value = value;
	this._oldValue = item.getValue();
}
MM.Action.SetValue.prototype = Object.create(MM.Action.prototype);
MM.Action.SetValue.prototype.perform = function() {
	this._item.setValue(this._value);
}
MM.Action.SetValue.prototype.undo = function() {
	this._item.setValue(this._oldValue);
}

MM.Action.InsertNewItem = function(parent, index) {
	this._parent = parent;
	this._index = index;
	this._item = new MM.Item();
}
MM.Action.InsertNewItem.prototype = Object.create(MM.Action.prototype);
MM.Action.InsertNewItem.prototype.perform = function() {
	this._item = this._parent.insertChild(this._item, this._index);
	MM.App.select(this._item);
}
MM.Action.InsertNewItem.prototype.undo = function() {
	this._parent.removeChild(this._item);
	MM.App.select(this._parent);
}

MM.Action.AppendItem = function(parent, item) {
	this._parent = parent;
	this._item = item;
}
MM.Action.AppendItem.prototype = Object.create(MM.Action.prototype);
MM.Action.AppendItem.prototype.perform = function() {
	this._parent.insertChild(this._item);
	MM.App.select(this._item);
}
MM.Action.AppendItem.prototype.undo = function() {
	this._parent.removeChild(this._item);
	MM.App.select(this._parent);
}

MM.Action.RemoveItem = function(item) {
	this._item = item;
	this._parent = item.getParent();
	this._index = this._parent.getChildren().indexOf(this._item);
}
MM.Action.RemoveItem.prototype = Object.create(MM.Action.prototype);
MM.Action.RemoveItem.prototype.perform = function() {
	this._parent.removeChild(this._item);
	MM.App.select(this._parent);
}
MM.Action.RemoveItem.prototype.undo = function() {
	this._parent.insertChild(this._item, this._index);
	MM.App.select(this._item);
}

MM.Action.MoveItem = function(item, newParent) {
	this._item = item;
	this._newParent = newParent;
	this._oldParent = item.getParent();
	this._oldIndex = this._oldParent.getChildren().indexOf(item);
}
MM.Action.MoveItem.prototype = Object.create(MM.Action.prototype);
MM.Action.MoveItem.prototype.perform = function() {
	this._oldParent.removeChild(this._item);
	this._newParent.insertChild(this._item);
	MM.App.select(this._item);
}
MM.Action.MoveItem.prototype.undo = function() {
	this._newParent.removeChild(this._item);
	this._oldParent.insertChild(this._item, this._oldIndex);
	MM.App.select(this._newParent);
}

MM.Action.Swap = function(item, diff) {
	this._item = item;
	this._parent = item.getParent();

	var children = this._parent.getChildren();
	var sibling = this._parent.getLayout().pickSibling(this._item, diff);
	
	this._sourceIndex = children.indexOf(this._item);
	this._targetIndex = children.indexOf(sibling);
}
MM.Action.Swap.prototype = Object.create(MM.Action.prototype);
MM.Action.Swap.prototype.perform = function() {
	this._parent.removeChild(this._item);
	this._parent.insertChild(this._item, this._targetIndex);

}
MM.Action.Swap.prototype.undo = function() {
	this._parent.removeChild(this._item);
	this._parent.insertChild(this._item, this._sourceIndex);
}

MM.Action.SetLayout = function(item, layout) {
	this._item = item;
	this._layout = layout;
	this._oldLayout = item.getOwnLayout();
}
MM.Action.SetLayout.prototype = Object.create(MM.Action.prototype);
MM.Action.SetLayout.prototype.perform = function() {
	this._item.setLayout(this._layout);
}
MM.Action.SetLayout.prototype.undo = function() {
	this._item.setLayout(this._oldLayout);
}

MM.Action.SetShape = function(item, shape) {
	this._item = item;
	this._shape = shape;
	this._oldShape = item.getOwnShape();
}
MM.Action.SetShape.prototype = Object.create(MM.Action.prototype);
MM.Action.SetShape.prototype.perform = function() {
	this._item.setShape(this._shape);
}
MM.Action.SetShape.prototype.undo = function() {
	this._item.setShape(this._oldShape);
}

MM.Action.SetColor = function(item, color) {
	this._item = item;
	this._color = color;
	this._oldColor = item.getOwnColor();
}
MM.Action.SetColor.prototype = Object.create(MM.Action.prototype);
MM.Action.SetColor.prototype.perform = function() {
	this._item.setColor(this._color);
}
MM.Action.SetColor.prototype.undo = function() {
	this._item.setColor(this._oldColor);
}
