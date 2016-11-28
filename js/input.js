"use strict"

var Input = {
	X: 0,
	Y: 0,
	IsHeld: false,
	WasPressed: false,
	WasReleased: false,
	Canvas: null,
	State: false
}

function InputInit(Canvas) {
	Input.Canvas = Canvas
	window.onmousedown = OnMouseDown
	window.onmouseup = OnMouseUp
	window.onmousemove = OnMouseMove
}

function InputUpdate() {
	Input.WasPressed = !Input.IsHeld && Input.State
	Input.WasReleased = Input.IsHeld && !Input.State
	Input.IsHeld = Input.State
}

function OnMouseDown(Event) {
	UpdateMousePosition(Event)
	Input.State = true
}

function OnMouseUp(Event) {
	UpdateMousePosition(Event)
	Input.State = false
}

function OnMouseMove(Event) {
	UpdateMousePosition(Event)
}

function UpdateMousePosition(Event) {
	Input.X = Math.floor(Event.pageX - Input.Canvas.offsetLeft)
	Input.Y = Math.floor(Event.pageY - Input.Canvas.offsetTop)
}
