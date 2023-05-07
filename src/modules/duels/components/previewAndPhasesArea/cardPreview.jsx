import { useContext } from "react";
import Store from "../../provider/duelProvider";

function CardPreview() {
  const { states } = useContext(Store.DuelContext);
  const [preview] = states.preview;

  return (
    <>
      <div className="previewAndPhaseZone--preview">
        {preview && (
          <img
            className="previewAndPhaseZone--preview__img"
            src={preview._image_full.route}
          />
        )}
      </div>
      <span className="text_preview text-light">
        {preview && preview.card_text}
      </span>
    </>
  );
}

export default CardPreview;
