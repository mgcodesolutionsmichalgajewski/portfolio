import AppKit

let size = NSSize(width: 1200, height: 630)
let canvas = NSImage(size: size)
canvas.lockFocus()

func color(_ hex: UInt32) -> NSColor {
  NSColor(
    red: CGFloat((hex >> 16) & 0xff) / 255,
    green: CGFloat((hex >> 8) & 0xff) / 255,
    blue: CGFloat(hex & 0xff) / 255,
    alpha: 1
  )
}

func text(_ value: String, x: CGFloat, y: CGFloat, size: CGFloat, color: NSColor, weight: NSFont.Weight = .regular) {
  value.draw(
    at: NSPoint(x: x, y: 630 - y - size),
    withAttributes: [
      .font: NSFont.systemFont(ofSize: size, weight: weight),
      .foregroundColor: color,
    ]
  )
}

func rect(x: CGFloat, top: CGFloat, width: CGFloat, height: CGFloat) -> NSRect {
  NSRect(x: x, y: size.height - top - height, width: width, height: height)
}

func centeredText(_ value: String, in frame: NSRect, size: CGFloat, color: NSColor, weight: NSFont.Weight) {
  let attributes: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: size, weight: weight),
    .foregroundColor: color,
  ]
  let textSize = value.size(withAttributes: attributes)
  let origin = NSPoint(
    x: frame.midX - textSize.width / 2,
    y: frame.midY - textSize.height / 2
  )
  value.draw(at: origin, withAttributes: attributes)
}

color(0xfaf9f5).setFill()
NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()

let portraitBackdrop = NSBezierPath(
  roundedRect: rect(x: 825, top: 82, width: 315, height: 430),
  xRadius: 34,
  yRadius: 34
)
color(0xe8f0e1).setFill()
portraitBackdrop.fill()

let portraitFrame = rect(x: 785, top: 108, width: 330, height: 410)
let portraitPath = NSBezierPath(roundedRect: portraitFrame, xRadius: 30, yRadius: 30)
NSGraphicsContext.saveGraphicsState()
portraitPath.addClip()
if let portrait = NSImage(contentsOfFile: "public/profil.jpg") {
  let sourceWidth = portrait.size.height * portraitFrame.width / portraitFrame.height
  let sourceFrame = NSRect(
    x: (portrait.size.width - sourceWidth) / 2,
    y: 0,
    width: sourceWidth,
    height: portrait.size.height
  )
  portrait.draw(in: portraitFrame, from: sourceFrame, operation: .sourceOver, fraction: 1)
}
NSGraphicsContext.restoreGraphicsState()

color(0xfaf9f5).setStroke()
portraitPath.lineWidth = 12
portraitPath.stroke()

text("MG.", x: 92, y: 82, size: 28, color: color(0x244b35), weight: .bold)
text("Code Solutions", x: 150, y: 88, size: 21, color: color(0x244b35), weight: .semibold)
text("SOFTWARE ENGINEER · ATLASSIAN", x: 92, y: 168, size: 17, color: color(0x698d56), weight: .bold)
text("Michał Gajewski", x: 92, y: 260, size: 58, color: color(0x193d2a), weight: .bold)
text("Forge · React · Java · AWS", x: 92, y: 334, size: 40, color: color(0x79a155), weight: .bold)
text("Aplikacje dla ekosystemu Atlassian", x: 92, y: 402, size: 24, color: color(0x657769))

let badgeFrame = rect(x: 92, top: 474, width: 278, height: 54)
let badge = NSBezierPath(roundedRect: badgeFrame, xRadius: 27, yRadius: 27)
color(0x244b35).setFill()
badge.fill()
centeredText("mgcodesolutions.pl", in: badgeFrame, size: 19, color: .white, weight: .bold)

canvas.unlockFocus()

guard
  let tiff = canvas.tiffRepresentation,
  let bitmap = NSBitmapImageRep(data: tiff),
  let png = bitmap.representation(using: .png, properties: [:])
else {
  fatalError("Nie udało się wygenerować obrazu Open Graph")
}

try png.write(to: URL(fileURLWithPath: "public/og-image.png"))
