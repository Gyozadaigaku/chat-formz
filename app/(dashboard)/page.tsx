import { GetFormStats, GetForms } from '@/actions/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode, Suspense } from 'react'
import {
  View,
  ClipboardList,
  MousePointerClick,
  Activity,
  MoveRight,
  Pencil,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import CreateFormBtn from '@/components/create-form-btn'
import { Form } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="col-span-2 text-4xl font-bold">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4, 5].map((index) => (
            <FormCardSkeleton key={index} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  )
}

async function CardStatsWrapper() {
  const stats = await GetFormStats()
  return <StatsCards loading={false} data={stats} />
}

type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>
  loading: boolean
}

function StatsCards({ data, loading }: StatsCardsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<View className="text-muted-foreground/80" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className=""
      />

      <StatsCard
        title="Total submissions"
        icon={<ClipboardList className="text-muted-foreground/80" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
        className=""
      />

      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick className="text-muted-foreground/80" />}
        helperText="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className=""
      />

      <StatsCard
        title="Bounce rate"
        icon={<Activity className="text-muted-foreground/80" />}
        helperText="Visits that leaves without interacting"
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className=""
      />
    </div>
  )
}

type StatsCardProps = {
  title: string
  icon: ReactNode
  helperText: string
  value: string
  loading: boolean
  className: string
}

export function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="pt-1 text-xs text-muted-foreground">{helperText}</p>
      </CardContent>
    </Card>
  )
}

function FormCardSkeleton() {
  return <Skeleton className="border-primary-/20 h-[190px] w-full border-2" />
}

async function FormCards() {
  const forms = await GetForms()
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm text-muted-foreground">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <ClipboardList className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="text-md mt-2 w-full gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <MoveRight />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant="secondary"
            className="text-md mt-2 w-full gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <Pencil size={16} />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
