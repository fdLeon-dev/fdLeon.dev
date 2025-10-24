'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProjectImage } from "@/components/ui/project-image"
import {
  Monitor,
  Smartphone,
  Tablet,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  ExternalLink
} from "lucide-react"

interface MockupViewerProps {
  screenshots: string[];
  title: string;
  className?: string;
}

export function MockupViewer({ screenshots, title, className = "" }: MockupViewerProps) {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [selectedScreenshot, setSelectedScreenshot] = useState(0)
  const [zoom, setZoom] = useState(100)

  const devices = {
    desktop: { icon: Monitor, label: 'Desktop', width: 'w-full' },
    tablet: { icon: Tablet, label: 'Tablet', width: 'w-3/4 max-w-md' },
    mobile: { icon: Smartphone, label: 'Mobile', width: 'w-1/2 max-w-sm' }
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50))
  }

  const handleResetZoom = () => {
    setZoom(100)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controles de dispositivo */}
      <div className="flex items-center justify-center gap-2">
        {Object.entries(devices).map(([key, device]) => (
          <Button
            key={key}
            variant={selectedDevice === key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDevice(key as keyof typeof devices)}
            className="flex items-center gap-2"
          >
            <device.icon className="h-4 w-4" />
            {device.label}
          </Button>
        ))}
      </div>

      {/* Controles de zoom */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          disabled={zoom <= 50}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <span className="px-3 py-1 bg-muted rounded text-sm font-medium">
          {zoom}%
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          disabled={zoom >= 200}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetZoom}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Mockup principal */}
      <div className="flex justify-center">
        <div className={`${devices[selectedDevice].width} relative`}>
          {/* Frame del dispositivo */}
          <div className="relative bg-gray-800 rounded-lg p-2 shadow-2xl">
            {/* Pantalla */}
            <div className="relative overflow-hidden rounded-md bg-white">
              <div
                className="transition-transform duration-300"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <ProjectImage
                  src={screenshots[selectedScreenshot]}
                  alt={`${title} - ${selectedDevice}`}
                  className="w-full h-auto"
                  fallbackText={`Screenshot ${selectedScreenshot + 1}`}
                />
              </div>
            </div>
          </div>

          {/* Overlay con información */}
          <div className="absolute top-4 right-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => setSelectedScreenshot(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedScreenshot === index
                ? 'border-primary shadow-lg'
                : 'border-border hover:border-primary/50'
                }`}
            >
              <ProjectImage
                src={screenshot}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                fallbackText={`Thumb ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Información */}
      <div className="text-center">
        <h3 className="font-semibold text-foreground mb-1">
          {title} - {devices[selectedDevice].label}
        </h3>
        <p className="text-sm text-muted-foreground">
          Screenshot {selectedScreenshot + 1} de {screenshots.length}
        </p>
      </div>
    </div>
  )
}

