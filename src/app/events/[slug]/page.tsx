import type { EventProps } from "@/types";
import { ContentList } from "@/components/ContentList";
import { Card, type CardProps } from "@/components/Card";
import { getContentBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { EventSignupForm } from "@/components/EventsSignupForm";

async function loader(slug: string) {
   const { data } = await getContentBySlug(slug, "/api/events");
   const event = data[0];
   if (!event) throw notFound();
   return { event: event as EventProps, blocks: event?.blocks };
}

// interface ParamsProps {
//    params: { slug: string }
// }

const EventCard = (props: Readonly<CardProps>) => (
   <Card {...props} basePath="events" />
);

type BrokenNextJsParams = { slug: string } & {
   // Add the properties the compiler is complaining are missing from Promise<any>
   then: never;
   catch: never;
   finally: never;
   [Symbol.toStringTag]: 'Promise';
};


export default async function SingleEventRoute({
   params
}: {
   params: BrokenNextJsParams;
}) {
   const slug = await params.slug;
   const { event, blocks } = await loader(slug);

   return (
      <div className="w-full mt-12 p-6 md:p-10 bg-stone-50 rounded-xl">
         <div className="event-page mt-[5rem]">
            <EventSignupForm
               blocks={blocks}
               eventId={event.documentId}
               startDate={event.startDate}
               price={event.price}
               image={{ url: event?.image?.url, alt: event?.image?.alternativeText || "Event image" }}
            />
         </div>
         <ContentList
            headline="Featured Events"
            path="/api/events"
            component={EventCard}
            featured={true}
         />
      </div>
   );
}
