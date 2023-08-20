import {
  useRouter,
  usePathname,
  useSearchParams,
  notFound,
} from "next/navigation";
import { CardPreview } from "~/components/CardPreview";
import { CardLegalFormats } from "~/components/Legalities";
import { type Card } from "~/utils/fetchTypes";

interface CardPageProps {
  params: {
    id: string;
  };
}
// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

export default async function CardInfo({ params }: CardPageProps) {
  //   const router = useRouter();
  //   const pathname = usePathname();
  //   const searchParams = useSearchParams();
  const cardId = params.id;
  const card = await getCard(cardId);

  console.log(card);

  if (!card) {
    notFound();
  }

  return (
    <div className="container">
      {card.name}
      <div>{cardId}</div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 ">
        <div>
          <CardPreview card={card} width={200} height={200} />
        </div>
        <div>
          <CardPreview card={card} width={200} height={200} />
        </div>
        <div>
          <CardLegalFormats legalities={card.legalities} />
        </div>
      </div>
    </div>
  );
}

async function getCard(id: string) {
  const res = await fetch(`https://api.scryfall.com/cards/${id}`);
  const card = (await res.json()) as Card;
  return card;
}
