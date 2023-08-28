import { type FetchCardRulingsResponce } from "~/utils/fetchTypes";

interface CardRulingsProps {
  cardName: string;
  cardId: string;
}

export default async function CardRulings({
  cardId,
  cardName,
}: CardRulingsProps) {
  const fetchRulings = async (id: string) => {
    try {
      const url = `https://api.scryfall.com/cards/${id}/rulings`;
      const responce = await fetch(url);
      if (responce.status !== 200)
        throw new Error("Something went wrong with fetch.");

      const { data }: FetchCardRulingsResponce =
        (await responce.json()) as FetchCardRulingsResponce;

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const rulings = await fetchRulings(cardId);

  //   const rulings = [
  //     {
  //       object: "ruling",
  //       oracle_id: "9b7f1d05-707c-4ed3-9f0e-8ced1232c2ee",
  //       source: "wotc",
  //       published_at: "2018-03-16",
  //       comment:
  //         "Thalia's ability affects each spell that's not a creature spell, including your own.",
  //     },
  //     {
  //       object: "ruling",
  //       oracle_id: "9b7f1d05-707c-4ed3-9f0e-8ced1232c2ee",
  //       source: "wotc",
  //       published_at: "2018-03-16",
  //       comment:
  //         "To determine the total cost of a spell, start with the mana cost or alternative cost you're paying, add any cost increases, then apply any cost reductions. The mana value of the spell remains unchanged, no matter what the total cost to cast it was.",
  //     },
  //   ];

  return (
    <>
      <div id="rulings" className="mt-8 w-full border-t-2 bg-[#F5F6F7] p-2">
        <div className="text-lg font-semibold uppercase">
          NOTES AND RULES INFORMATION FOR{" "}
          <a href="#rulings" className="text-purple-800">
            {cardName}
          </a>
        </div>
        <div className="my-4 grid grid-cols-1 gap-2 text-base lg:grid-cols-2">
          {rulings?.length
            ? rulings.map((rule, idx) => (
                <div className="mt-2" key={`${rule.oracle_id}${idx}`}>
                  <div className="whitespace-pre-line">{rule.comment}</div>
                  <div className="italic text-slate-600">
                    ({rule.published_at})
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
