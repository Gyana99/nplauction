<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TeamController extends Controller
{


    public function addteam(Request $request)
    {
        // ✅ VALIDATION
        $validator = Validator::make($request->all(), [
            'team_name'    => 'required|string|max:100',
            'short_name'   => 'required|string|max:50',
            'woner_name'   => 'required|string|max:200',
            'logo'         => 'required|string',
            'woner_image'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // ✅ SAVE LOGO IMAGE
        $logoPath = $this->saveBase64Image($request->logo, 'uploads/logo');

        // ✅ SAVE OWNER IMAGE
        $ownerPath = $this->saveBase64Image($request->woner_image, 'uploads/owner');

        // ✅ INSERT INTO DATABASE
        $team = DB::table('team')->insert([
            'team_name'   => $request->team_name,
            'short_name'  => $request->short_name,
            'woner_name'  => $request->woner_name,
            'logo'        => $logoPath,
            'woner_image' => $ownerPath,
            'status'      => 1,
            'created_at'  => Carbon::now()->toDateTimeString(),
            'created_by'  => $request->created_by,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Team added successfully'
        ]);
    }
    public function viewTeam()
    {
        $teams = DB::table('team')
            ->orderBy('created_at', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $teams
        ], 200);
    }
    public function updateTeam(Request $request)
    {
        // 🔹 Find existing team
        $team = DB::table('team')->where('id', $request->id)->first();

        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found'
            ], 404);
        }

        /* =============================
       HANDLE LOGO
    ============================== */
        $logo = $team->logo;

        if ($request->logo && str_contains($request->logo, 'base64')) {
            $logo = $this->saveBase64Image($request->logo, 'app/public/teams/logo');
        }

        /* =============================
       HANDLE OWNER IMAGE
    ============================== */
        $ownerImage = $team->woner_image;

        if ($request->woner_image && str_contains($request->woner_image, 'base64')) {
            $ownerImage = $this->saveBase64Image($request->woner_image, 'app/public/teams/owner');
        }

        /* =============================
       UPDATE DATABASE
    ============================== */
        DB::table('team')->where('id', $request->id)->update([
            'team_name'   => $request->team_name,
            'short_name'  => $request->short_name,
            'woner_name'  => $request->woner_name,
            'logo'        => $logo,
            'woner_image' => $ownerImage,
            'updated_at'  => Carbon::now()->toDateTimeString(),
            'created_by'  => $request->created_by,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Team updated successfully'
        ]);
    }
    public function giveAmount(Request $request)
    {
        $input = $request->all();
        // return $input['id'];
        //✅ Validate request
        // $request->validate([
        //     'id' => 'required|integer|exists:teams,id'
        // ]);

        // 🔎 Get team
        $team = DB::table('team')->where('id', $request->id)->first();

        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found'
            ], 404);
        }

        // ✅ Update amount status
        DB::table('team')->where('id', $input['id'])->update([
            'amount_status' => 1,
            'amount' => 5000,
            'created_by' => $input['created_by'],
            'updated_at' => Carbon::now()->toDateTimeString()
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Amount given successfully'
        ]);
    }

    private function saveBase64Image($base64Image, $folder)
    {
        // extract image type
        preg_match('/data:image\/(.*?);base64/', $base64Image, $match);
        $extension = $match[1] ?? 'png';

        // remove base64 header
        $image = preg_replace('/^data:image\/.*;base64,/', '', $base64Image);
        $image = base64_decode($image);

        // create filename
        $fileName = Str::random(20) . '.' . $extension;
        $path = storage_path($folder);;
        // return $path ;

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        file_put_contents($path . '/' . $fileName, $image);

        return  $fileName;
    }
    public function mypointandhistry(Request $request)
    {
        $id = $request->input('adminid');

        // 1️⃣ Get team_id directly
        $teamId = DB::table('admin')
            ->where('id', $id)
            ->value('team_id');

        if (!$teamId) {
            return response()->json([
                'status' => false,
                'message' => 'Admin or Team not found'
            ], 404);
        }

        // 2️⃣ Get team amount
        $amount = DB::table('team')
            ->where('id', $teamId)
            ->value('amount');

        // 3️⃣ Get total players count
        $totalPlayers = DB::table('player_registration')
            ->where('team', $teamId)
            ->where('status', 1)
            ->get();

        // 4️⃣ Return optimized response
        return response()->json([
            'status' => true,
            'amount' => $amount,
            'total_players' => $totalPlayers
        ], 200);
    }
    // public function assignRole(Request $request)
    // {
    //     $input = $request->all();
    //     $id = $input['id'];
    //     $roll = $input['roll'];
    //     $teamid = $input['teamid'];
    //     $teamiddata = DB::table('admin')->where('id', $teamid)->first(['team_id']);
    //     $finalteamid = $teamiddata->team_id;
    //     $presentroll = DB::table('player_registration')
    //         ->where('team', $finalteamid)
    //         ->where('player_roll', $roll)
    //         ->first();
    //         //return $rolldata?'t':'f';
    //     if (!$presentroll) {
    //         DB::table('player_registration')
    //             ->where('id', $id)
    //             ->update([
    //                 'player_roll'=> $roll
    //             ]);
    //     }
    // }

    public function assignRole(Request $request)
    {
        DB::beginTransaction();

        try {
            $playerId = $request->input('id');        // player_registration.id
            $role     = $request->input('roll');      // C | VC | WK | C,WK | VC,WK
            $adminId  = $request->input('teamid');    // admin.id

            /* 1️⃣ Get team_id */
            $teamId = DB::table('admin')
                ->where('id', $adminId)
                ->value('team_id');

            if (!$teamId) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid team'
                ], 404);
            }

            /* 2️⃣ Validate player */
            $player = DB::table('player_registration')
                ->where('id', $playerId)
                ->where('team', $teamId)
                ->first();

            if (!$player) {
                return response()->json([
                    'status' => false,
                    'message' => 'Player not found in this team'
                ], 404);
            }

            /* 3️⃣ Parse incoming role */
            $roles = explode(',', $role); // e.g. ['C','WK']

            $hasC  = in_array('C', $roles);
            $hasVC = in_array('VC', $roles);
            $hasWK = in_array('WK', $roles);

            /* =========================
           FULL RESET OLD ROLE HOLDERS
        ========================== */

            if ($hasC) {
                DB::table('player_registration')
                    ->where('team', $teamId)
                    ->where('player_roll', 'like', '%C%')
                    ->update(['player_roll' => 'P']);
            }

            if ($hasVC) {
                DB::table('player_registration')
                    ->where('team', $teamId)
                    ->where('player_roll', 'like', '%VC%')
                    ->update(['player_roll' => 'P']);
            }

            if ($hasWK) {
                DB::table('player_registration')
                    ->where('team', $teamId)
                    ->where('player_roll', 'like', '%WK%')
                    ->update(['player_roll' => 'P']);
            }

            /* =========================
           ASSIGN NEW ROLE
        ========================== */

            DB::table('player_registration')
                ->where('id', $playerId)
                ->update([
                    'player_roll' => $role   // EXACT role from dropdown
                ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Role updated successfully',
                'player_id' => $playerId,
                'role' => $role
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Role update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
