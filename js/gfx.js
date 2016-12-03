"use strict"

var Gfx = {
	Width: 0,
	Height: 0,
	Context: null
}

function GfxInit(Canvas) {
	Gfx.Width = Canvas.width
	Gfx.Height = Canvas.height
	Gfx.Context = Canvas.getContext("2d")
}

function GfxPush() {
	Gfx.Context.save()
}

function GfxPop() {
	Gfx.Context.restore()
}

function GfxTranslate(X, Y) {
	Gfx.Context.translate(X, Y)
}

function GfxScale(X, Y) {
	Gfx.Context.scale(X, Y)
}

function GfxRotate(Angle) {
	Gfx.Context.rotate(Angle)
}

function GfxColor(Color) {
	var R = Math.floor(Color[0] * 255)
	var G = Math.floor(Color[1] * 255)
	var B = Math.floor(Color[2] * 255)
	Gfx.Context.fillStyle = "rgb(" + R + "," + G + "," + B + ")"
	Gfx.Context.strokeStyle = "rgb(" + R + "," + G + "," + B + ")"
}

function GfxRect(X, Y, Width, Height) {
	Gfx.Context.fillRect(X, Y, Width, Height)
}

function GfxLine(X, Y, toX, toY, scaleX, scaleY) {
	Gfx.Context.beginPath()
	Gfx.Context.moveTo(X, Y)
	Gfx.Context.lineTo(scaleX * toX, scaleY * toY)
	Gfx.Context.closePath()
	Gfx.Context.stroke()
}
