"use strict"

var unit = function(){
	this.X = 0
	this.Y = 0
	this.Angle = 0
	this.Width = 24
	this.Height = 64
	this.Speed = 128
	this.Strength = 50
	this.TargetX = -1
	this.TargetY = -1
	this.Team = 0
}

var Game = {
	Units: [],
	NumUnits: 5,
	SelectedUnit: -1,
}

function GameInit() {
	var i = 0
	while (i < Game.NumUnits) {
		Game.Units.push(new unit())
		Game.Units[i].Angle = 0
		Game.Units[i].Width = 24
		Game.Units[i].Height = 64
		Game.Units[i].TargetX = -1
		Game.Units[i].TargetY = -1
		Game.Units[i].Speed = 64
		Game.Units[i].Strength = 50
		if (i < Game.NumUnits / 2) {
			Game.Units[i].X = 35 + 64 * i
			Game.Units[i].Y = 35 + 64 * i
			Game.Units[i].Team = 1
		} else {
			Game.Units[i].X = Gfx.Width - 35 - 64 * i
			Game.Units[i].Y = Gfx.Height - 35 - 64 * i
			Game.Units[i].Team = 2
		}
		i++
	}
}

function GameUpdate() {
	UpdateBlock()
}

function UpdateBlock() {
	BlocksRespondToInput()
	BlocksMove()
}

function BlocksMove() {
	var Dt = Timer.Delta
	var i = 0
	for (; i < Game.NumUnits; i++) { 
		if (Game.Units[i].TargetX > -1 && Game.Units[i].TargetY > -1) {
			var Dx = Game.Units[i].TargetX - Game.Units[i].X
			var Dy = Game.Units[i].TargetY - Game.Units[i].Y
			var Dist = Math.sqrt(Dx * Dx + Dy * Dy)
			var Speed = Game.Units[i].Speed
			
			Game.Units[i].X += Dt * Speed * Dx / Dist
			Game.Units[i].Y += Dt * Speed * Dy / Dist
			Game.Units[i].Angle = Math.atan2(Dy, Dx)
			
			var distToTargetX = Math.abs(Game.Units[i].TargetX - Game.Units[i].X)
			var distToTargetY = Math.abs(Game.Units[i].TargetY - Game.Units[i].Y)
			if (distToTargetX < 1 && distToTargetY < 1) {
				Game.Units[i].TargetX = -1
				Game.Units[i].TargetY = -1
			}   
		}       
	}
}

function BlocksRespondToInput() {
	if (Input.WasPressed) {
		var i = 0
		for (; i < Game.NumUnits; i++) { 
			var Bw = Game.Units[i].Width
			var Bh = Game.Units[i].Height
			if (Input.X > Game.Units[i].X - Bw / 2 && Input.X < Game.Units[i].X + Bw / 2) {
				if (Input.Y > Game.Units[i].Y - Bh / 2 && Input.Y < Game.Units[i].Y + Bh / 2) {
					if (Game.Units[i].Team == 1) {
						Game.SelectedUnit = i;						
					}
				}
			}
		}
	}
	if (Input.WasReleased) {
		if (Game.SelectedUnit > -1) {
			Game.Units[Game.SelectedUnit].TargetX = Input.X;
			Game.Units[Game.SelectedUnit].TargetY = Input.Y;
			Game.SelectedUnit = -1
		}   
	}
}

function GameDraw() {
	ClearView()
	var i = 0
	for (; i < Game.NumUnits; i++) { 
		DrawUnit(i)
	}
}

function ClearView() {
	GfxColor([0.55, 0.60, 0.65]) // Blue-ish grey
	GfxRect(0, 0, Gfx.Width, Gfx.Height)
}

function DrawUnit(index) {
	GfxPush()
	if (index != Game.SelectedUnit) {
		if (Game.Units[index].Team == 1) {
			GfxColor([0.1, 0.2, 0.9])
		} else {
			GfxColor([0.9, 0.1, 0.2]) // Red-ish			
		}
	} else {
		GfxColor([0.1, 0.9, 0.4])
	}
	GfxTranslate(Game.Units[index].X, Game.Units[index].Y)
	GfxRotate(Game.Units[index].Angle)
	var unitW = Game.Units[index].Width
	var unitH = Game.Units[index].Height
	GfxLine(0.5, -0.5, 0.7, 0, unitW, unitH)
	GfxScale(unitW, unitH)
	GfxRect(-0.5, -0.5, 1, 1)
	GfxPop()
}
