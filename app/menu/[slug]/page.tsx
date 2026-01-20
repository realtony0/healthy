import { prisma } from '@/lib/prisma'
import ProductDetail from '@/components/products/ProductDetail'
import { notFound } from 'next/navigation'
import { ArrowLeft, Leaf } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
  })

  if (!product) return { title: 'Produit non trouvé' }

  return {
    title: `${product.name} | Healthy Dakar`,
    description: product.description || `Découvrez ${product.name}, un plat équilibré et savoureux préparé par Healthy Dakar.`,
    openGraph: {
      images: [product.image || '/img/logo.jpeg'],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  const product = await prisma.product.findUnique({
    where: { slug },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-[var(--color-cream)] min-h-screen">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/menu" 
            className="inline-flex items-center gap-2 text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au menu
          </Link>
        </nav>

        {/* Product Detail */}
        <div className="card card-elevated p-6 lg:p-10">
          <ProductDetail product={product} />
        </div>

        {/* Back to menu CTA */}
        <div className="mt-8 text-center">
          <Link href="/menu" className="btn btn-secondary">
            <Leaf className="w-4 h-4" />
            Voir d&apos;autres produits
          </Link>
        </div>
      </div>
    </div>
  )
}
