import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Instagram, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Product {
  id: number
  name: string
  price: number
  points: number
  image: string
}

const products: Product[] = [
  { id: 1, name: "Space Shuttle T-Shirt", price: 25, points: 50, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202024-10-05%20a%20las%2014.08.48-UZrlARG3pKJ3KBaHGKcbpx8ACPmQXt.png" },
  { id: 2, name: "Asteroid Mug", price: 15, points: 30, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202024-10-05%20a%20las%2014.09.01-mWOi34LRJpaGDuc7fauLElapJ0qyT4.png" },
  { id: 3, name: "Planet Sticker Set", price: 10, points: 20, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202024-10-05%20a%20las%2014.09.24-L2SMk5VI8honxyTxp5D3GkeGcdMkle.png" },
]

interface RankingUser {
  name: string
  points: number
  avatar: string
}

const rankingUsers: RankingUser[] = [
  { name: "AstroNinja", points: 1250, avatar: "https://s0nzicnyyxgqrd4.public.blob.vercel-storage.com/avatar1-0Iy7Ik5ItSGw5uf9u9TBwx7KBXXpUJ.jpg" },
  { name: "CosmicQueen", points: 980, avatar: "https://s0nzicnyyxgqrd4.public.blob.vercel-storage.com/avatar2-TA1rBmrOWQgwgwuKvM8XVGC8zcBNfI.jpg" },
  { name: "StarGazer42", points: 875, avatar: "https://s0nzicnyyxgqrd4.public.blob.vercel-storage.com/avatar3-3Fy9vkDPYZZBLOZU9Ym1FfOZBnbLYE.jpg" },
  { name: "NebulaNomad", points: 720, avatar: "https://s0nzicnyyxgqrd4.public.blob.vercel-storage.com/avatar4-eFdKXqVVtWPDUL4MBQHqNGwXy8Uy0q.jpg" },
  { name: "GalacticPioneer", points: 650, avatar: "https://s0nzicnyyxgqrd4.public.blob.vercel-storage.com/avatar5-Hy7kWEhFXZPVwKKXXbGxLLZjwxLLGP.jpg" },
]

export default function Component() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [email, setEmail] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const handleAnswerSubmit = (answer: string) => {
    setSelectedAnswer(answer)
    setIsAnswered(true)
    if (answer === "Redirect its trajectory") {
      setScore(prevScore => prevScore + 1)
    }
  }

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product])
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const buyWithMoney = (product: Product) => {
    addToCart(product)
    alert(`You've added ${product.name} to your cart for $${product.price}`)
  }

  const buyWithPoints = (product: Product) => {
    if (score >= product.points) {
      setScore(prevScore => prevScore - product.points)
      addToCart(product)
      alert(`You've purchased ${product.name} with ${product.points} points!`)
    } else {
      alert("You don't have enough points for this item.")
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for subscribing with email: ${email}`)
    setEmail("")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full h-full relative bg-gray-900 text-white">
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NOT%20TODAY-GnE0Qj8TwSANCBMN8NLteJ3F1vtWDs.png" alt="NOT TODAY logo" className="w-10 h-10 rounded-full" />
              <h1 className="text-lg font-bold">NOT TODAY</h1>
            </div>
            <span className="text-sm text-blue-400 font-medium" aria-live="polite">
              {formatDateTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Section 1: Daily Update */}
        <div className="bg-gray-800 p-4 mb-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Daily Update</h2>
            <p className="text-green-400 font-bold text-sm mb-2">No world-ending meteors today! 🎉</p>
            <h3 className="text-base font-semibold mb-1">Fun Fact</h3>
            <p className="text-xs">The asteroid belt between Mars and Jupiter contains millions of asteroids, but they're so spread out that spacecraft can usually pass through safely!</p>
          </div>
        </div>

        <div className="grid grid-cols-3">
          {/* Section 2: Solar System Orrery, Nearby Objects, and Asteroid Approach */}
          <div className="col-span-2 bg-gray-700 p-4 mb-4 h-full">
            {/* Detailed Orrery */}
            <div className="mb-4 h-full">
              <h2 className="text-lg font-semibold mb-2">Solar System Orrery</h2>
              <iframe className="h-full w-full bg-gray-800 rounded-lg" src="https://platform.twitter.com/widgets/tweet_button.html"></iframe>
              <p className="text-xs mt-2 text-gray-400">Note: In the future, you'll be able to select asteroids here to view details in the Nearby Objects section.</p>
            </div>

          </div>

          <div className="col-span-1">
            
            {/* Nearby Objects */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Nearby Space Objects</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-gray-800 p-2 rounded-t text-left">
                    <div className="flex justify-between items-center w-full">
                      <span>Asteroid 2023 XY</span>
                      <Badge variant="secondary">1.2km</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-600 p-2 rounded-b text-sm">
                    This asteroid is about the size of 3 Empire State Buildings stacked on top of each other. Its mass is equivalent to approximately 7,000 blue whales!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="mt-2">
                  <AccordionTrigger className="bg-gray-800 p-2 rounded-t text-left">
                    <div className="flex justify-between items-center w-full">
                      <span>Comet Swift-Tuttle</span>
                      <Badge variant="secondary">26km</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-600 p-2 rounded-b text-sm">
                    This comet is as wide as the island of Manhattan. Its mass is comparable to about 500 million Statues of Liberty!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="mt-2">
                  <AccordionTrigger className="bg-gray-800 p-2 rounded-t text-left">
                    <div className="flex justify-between items-center w-full">
                      <span>NEO 2021 PDC</span>
                      <Badge variant="secondary">0.8km</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-600 p-2 rounded-b text-sm">
                    This Near Earth Object is about twice the size of the Eiffel Tower. Its weight is equivalent to approximately 34,000 Opel Corsa cars!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Asteroid Approach Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                Asteroid Approach
                <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded">LIVE</span>
              </h2>
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <video
                  src="https://www.youtube.com/watch?v=0FBiyFpV__g"
                  className="w-full h-full object-cover"
                  autoPlay
                />
              </div>
              <p className="text-xs mt-2 text-gray-400">Live view of Earth from the International Space Station</p>
            </div>

            {/* Section 3: Daily Quiz, Ranking, and Space Merch */}
            <div className="bg-gray-800 p-4">
              {/* Daily Quiz with Top Defenders Ranking */}
              <div className="bg-gray-700 p-3 rounded-lg mb-4">
                <h3 className="text-base font-semibold mb-2">Daily Quiz</h3>
                <p className="text-sm mb-3">How do you think would be the best way to deal with an asteroid that's going to destroy Earth?</p>
                <div className="space-y-2">
                  {["Nuke it", "Redirect its trajectory", "Build a giant shield"].map((answer) => (
                    <Button
                      key={answer}
                      onClick={() => handleAnswerSubmit(answer)}
                      disabled={isAnswered}
                      className={`w-full justify-start ${isAnswered && answer === "Redirect its trajectory"
                        ? "bg-green-500 hover:bg-green-600"
                        : isAnswered && answer === selectedAnswer
                          ? "bg-red-500 hover:bg-red-600"
                          : ""
                        }`}
                    >
                      {answer}
                    </Button>
                  ))}
                </div>
                {isAnswered && (
                  <p className="mt-3 text-sm">
                    {selectedAnswer === "Redirect its trajectory"
                      ? "Correct! Redirecting the asteroid's trajectory is generally considered the safest and most effective method."
                      : "Not quite. Redirecting the asteroid's trajectory is generally considered the safest and most effective method."}
                  </p>
                )}
                <p className="mt-3 text-sm font-semibold">Your score: {score}</p>

                {/* Top Defenders Ranking */}
                <div className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="top-defenders">
                      <AccordionTrigger className="bg-gray-800 p-2 rounded-t text-left">
                        <div className="flex justify-between items-center w-full">
                          <span>Top Defenders Ranking</span>
                          <Badge variant="secondary">{rankingUsers.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-600 p-2 rounded-b">
                        {rankingUsers.map((user, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-500 last:border-b-0">
                            <div className="flex items-center">
                              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                              <span className="text-sm font-medium">{user.name}</span>
                            </div>
                            <span className="text-sm font-bold" style={{ color: `hsl(${user.points / 10}, 70%, 60%)` }}>
                              {user.points} pts
                            </span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* E-commerce Section */}
              <div className="bg-gray-700 p-3 rounded-lg mb-4">
                <h3 className="text-base font-semibold mb-2">Space Merch Shop</h3>
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-gray-600 p-2 rounded-lg flex items-center">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-3" />
                      <div className="flex-grow">
                        <h4 className="text-sm font-semibold">{product.name}</h4>
                        <p className="text-xs text-gray-400">${product.price} or {product.points} points</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Button size="sm" onClick={() => buyWithMoney(product)}>
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => buyWithPoints(product)} className="text-black bg-white hover:bg-gray-200 hover:text-black">
                          Use Points
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-base font-semibold mb-2">Stay Updated</h3>
                <form onSubmit={handleEmailSubmit} className="mb-4">
                  <div className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow"
                      required
                    />
                    <Button type="submit">Subscribe</Button>
                  </div>
                </form>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 text-xs p-4 mt-8">
              <div className="mb-2">
                <p>© 2024 NOT TODAY App. All rights reserved.</p>
                <p>A project sponsored by NASA</p>
              </div>
              <nav className="flex space-x-2">
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Contact Us</a>
              </nav>
            </footer>

            {/* Shopping Cart */}
            <div className="sticky bottom-0 bg-gray-900 p-2 border-t border-gray-700 flex justify-between items-center">
              <span className="text-sm font-semibold">Cart: {cart.length} items</span>
              <Button size="sm" className="flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
              </Button>
            </div>
          </div>
        </div>

      </Card>
    </div>
  )
}