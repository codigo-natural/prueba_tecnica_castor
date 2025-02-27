import Link from 'next/link';
import { IoHeart } from 'react-icons/io5'

export default function PlayerTrackInfo({ currentTrack }) {
  return (
    <div className="flex items-center col-span-3 gap-3">
      {currentTrack.album && (
        <img
          src={currentTrack.album.images?.[0].url}
          alt={currentTrack.name}
          className="w-14 h-14"
        />
      )}
      <div className="max-w-full">
        <h4 className="text-sm truncate">{currentTrack?.name}</h4>
        <Link href={`/artist/${currentTrack?.artists[0].id}`}>
          <h5 className="text-xs text-gray">
            {currentTrack?.artists[0].name}
          </h5>
        </Link>
      </div>
      <div>
        <IoHeart className="text-xl text-primary" />
      </div>
    </div>
  );
}