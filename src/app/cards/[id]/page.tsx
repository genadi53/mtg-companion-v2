import {
  useRouter,
  usePathname,
  useSearchParams,
  notFound,
} from "next/navigation";
import { CardInfo } from "~/components/CardInfo";
import { CardPreview } from "~/components/CardPreview";
import CardRulings from "~/components/CardRulings";
import CardSets from "~/components/CardSets";
import { type Card } from "~/utils/fetchTypes";

interface CardPageProps {
  params: {
    id: string;
  };
}
// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

export default async function CardInfoPage({ params }: CardPageProps) {
  //   const router = useRouter();
  //   const pathname = usePathname();
  //   const searchParams = useSearchParams();
  const cardId = params.id;
  const card = await getCard(cardId);
  // console.log(card);

  if (!card) {
    return notFound();
  }

  return (
    <>
      {card && (
        <div className="container">
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 ">
            <div>
              <CardPreview card={card} width={200} height={200} />
            </div>
            <div>
              <CardInfo card={card} />
            </div>
            <div>
              <CardSets card={card} />
            </div>
          </div>
          <CardRulings cardId={card.id} cardName={card.name} />
        </div>
      )}
    </>
  );
}

type CardResponce = Card | null;
async function getCard(id: string) {
  try {
    const res = await fetch(`https://api.scryfall.com/cards/${id}`);
    if (res.status !== 200) throw new Error("Something went wrong with fetch.");
    const card = (await res.json()) as CardResponce;
    // console.log(card);
    return card;
  } catch (error) {
    console.error(error);
    return null;
  }
}
