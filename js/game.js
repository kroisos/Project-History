"use strict"

var Game = {
	BlockX: 64,
	BlockY: 64,
	BlockAngle: 0,
	BlockWidth: 24,
	BlockHeight: 64,
	BlockSpeed: 128
}

function GameInit() {

}

function GameUpdate() {
	UpdateBlock()
}

function UpdateBlock() {
	if (Input.IsHeld) {
		var Dt = Timer.Delta
		var Dx = Input.X - Game.BlockX
		var Dy = Input.Y - Game.BlockY
		var Dist = Math.sqrt(Dx * Dx + Dy * Dy)
		var Speed = Game.BlockSpeed

		Game.BlockX += Dt * Speed * Dx / Dist
		Game.BlockY += Dt * Speed * Dy / Dist
		Game.BlockAngle = Math.atan2(Dy, Dx)
	}
}

function GameDraw() {
	ClearView()
	DrawBlock()
}

function ClearView() {
	GfxColor([0.55, 0.60, 0.65]) // Blue-ish grey
	GfxRect(0, 0, Gfx.Width, Gfx.Height)
}

function DrawBlock() {
	GfxPush()
	GfxTranslate(Game.BlockX, Game.BlockY)
	GfxRotate(Game.BlockAngle)
	GfxScale(Game.BlockWidth, Game.BlockHeight)
	GfxColor([0.9, 0.1, 0.2]) // Red-ish
	GfxRect(-0.5, -0.5, 1, 1)
	GfxPop()
}
