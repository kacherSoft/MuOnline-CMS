/**
 * character-profile-page Component
 * Public character profile page with stats and class info
 */

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ClassBanner } from './class-banner';
import { StatsDisplay } from './stats-display';
import { useCharacterProfile } from '../hooks/use-character-profile';
import { LoadingSpinner, SkeletonCard } from '@/components/common/loading-spinner';
import { Shield, Crown, MapPin, Coins } from 'lucide-react';
import { formatNumber } from '@/utils/class-utils';
import type { CharacterProfile } from '../types/profile-types';

export function CharacterProfilePage() {
  const { characterName } = useParams<{ characterName: string }>();
  const { data: profile, isLoading, error } = useCharacterProfile(characterName || '');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <SkeletonCard className="h-48" />
          <div className="grid gap-6 md:grid-cols-2">
            <SkeletonCard className="h-64" />
            <SkeletonCard className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-500/30 bg-bg-dark/80 p-12">
            <div className="text-6xl">😢</div>
            <h2 className="mt-4 text-2xl font-bold text-text-primary">Character Not Found</h2>
            <p className="mt-2 text-text-muted">
              The character &quot;{characterName}&quot; could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Banner */}
        <ProfileHeader profile={profile} />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Class Banner */}
            <div className="rounded-xl border border-white/10 bg-bg-dark/80 p-6">
              <ClassBanner class={profile.class} size="xl" showGlow />
            </div>

            {/* Basic Info */}
            <InfoCard profile={profile} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="rounded-xl border border-white/10 bg-bg-dark/80 p-6">
              <StatsDisplay stats={profile} />
            </div>

            {/* Additional Info */}
            <AdditionalInfo profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProfileHeaderProps {
  profile: CharacterProfile;
}

function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-8',
        profile.online ? 'border-cyan-500/50' : 'border-white/10'
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(18,32,53,0.95) 100%)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary drop-shadow-lg">
              {profile.name}
            </h1>
            {profile.guild && (
              <p className="mt-2 flex items-center gap-2 text-lg text-text-muted">
                <Crown className="h-4 w-4" />
                <span>{profile.guild}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 rounded-full bg-bg-dark/80 px-4 py-2">
              <div
                className={cn('h-2 w-2 rounded-full', profile.online ? 'bg-green-500 animate-pulse' : 'bg-gray-500')}
              />
              <span className="text-sm font-medium text-text-muted">
                {profile.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <LevelBadge level={profile.level} resets={profile.resets} />
        </div>
      </div>
    </div>
  );
}

function LevelBadge({ level, resets }: { level: number; resets: number }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
      <Shield className="h-5 w-5 text-cyan-400" />
      <div>
        <p className="text-xs font-medium text-text-muted">Level</p>
        <p className="text-xl font-bold text-cyan-400">{formatNumber(level)}</p>
      </div>
      {resets > 0 && (
        <>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-xs font-medium text-text-muted">Resets</p>
            <p className="text-xl font-bold text-yellow-400">{formatNumber(resets)}</p>
          </div>
        </>
      )}
    </div>
  );
}

function InfoCard({ profile }: { profile: CharacterProfile }) {
  return (
    <div className="rounded-xl border border-white/10 bg-bg-dark/80 p-6">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">Character Info</h3>
      <div className="space-y-3">
        <InfoItem label="Name" value={profile.name} />
        <InfoItem label="Level" value={formatNumber(profile.level)} />
        <InfoItem label="Resets" value={formatNumber(profile.resets)} />
        {profile.money !== undefined && (
          <InfoItem
            label="Zen"
            value={formatNumber(profile.money)}
            icon={<Coins className="h-4 w-4 text-yellow-400" />}
          />
        )}
      </div>
    </div>
  );
}

function AdditionalInfo({ profile }: { profile: CharacterProfile }) {
  return (
    <div className="rounded-xl border border-white/10 bg-bg-dark/80 p-6">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">Location</h3>
      {profile.online && profile.mapNumber !== undefined ? (
        <div className="flex items-center gap-2 text-text-muted">
          <MapPin className="h-5 w-5 text-cyan-400" />
          <span>Map {profile.mapNumber}</span>
          {profile.posX !== undefined && profile.posY !== undefined && (
            <span className="text-sm">
              ({profile.posX}, {profile.posY})
            </span>
          )}
        </div>
      ) : (
        <p className="text-text-muted">Character is offline</p>
      )}
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="text-sm font-medium text-text-muted">{label}</span>
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-text-primary">{value}</span>
      </div>
    </div>
  );
}

export default CharacterProfilePage;
